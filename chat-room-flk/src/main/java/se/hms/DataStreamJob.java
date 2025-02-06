/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package se.hms;

import com.amazonaws.services.kinesisanalytics.runtime.KinesisAnalyticsRuntime;
import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.connector.kinesis.source.KinesisStreamsSource;
import org.apache.flink.connector.kinesis.source.config.KinesisSourceConfigOptions;
import org.apache.flink.connector.kinesis.source.config.KinesisSourceConfigOptions.InitialPosition;
import org.apache.flink.connector.kinesis.source.enumerator.assigner.ShardAssignerFactory;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Objects;
import java.util.Properties;

/**
 * Skeleton for a Flink DataStream Job.
 *
 * <p>For a tutorial how to write a Flink application, check the
 * tutorials and examples on the <a href="https://flink.apache.org">Flink Website</a>.
 *
 * <p>To package your application into a JAR file for execution, run
 * 'mvn clean package' on the command line.
 *
 * <p>If you change the name of the main class (with the public static void main(String[] args))
 * method, change the respective entry in the POM.xml file (simply search for 'mainClass').
 */
public class DataStreamJob {

	public static void main(String[] args) throws Exception {
		// Sets up the execution environment, which is the main entry point
		// to building Flink applications.
		final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

		Map<String, Properties> applicationProperties = getApplicationProperties();
		final String influxdbToken = applicationProperties.get("influxdb").getProperty("token");
		final String influxdbUrl = applicationProperties.get("influxdb").getProperty("url");
		final String influxdbBucket = applicationProperties.get("influxdb").getProperty("default.bucket");
		final String influxdbOrg = applicationProperties.get("influxdb").getProperty("organisation");
		final String kinesisArn = applicationProperties.get("kinesis").getProperty("data.pipeline.arn");

		// KinesisStreamsSource
		Configuration sourceConfig = new Configuration();
		sourceConfig.set(KinesisSourceConfigOptions.STREAM_INITIAL_POSITION, InitialPosition.AT_TIMESTAMP); // This is optional, by default connector will read from LATEST
		sourceConfig.set(KinesisSourceConfigOptions.STREAM_INITIAL_TIMESTAMP, String.valueOf(Instant.now().minus(5, ChronoUnit.MINUTES).getEpochSecond()));

		// Create a new KinesisStreamsSource to read from specified Kinesis Stream.
		KinesisStreamsSource<MessageDto> kdsSource =
				KinesisStreamsSource.<MessageDto>builder()
						.setStreamArn(kinesisArn)
						.setSourceConfig(sourceConfig)
						.setDeserializationSchema(new MessageDtoDeserializationSchema())
						.setKinesisShardAssigner(ShardAssignerFactory.uniformShardAssigner()) // This is optional, by default uniformShardAssigner will be used.
						.build();

		DataStream<MessageDto> kinesisRecordsWithEventTimeWatermarks = env.fromSource(
						kdsSource,
						WatermarkStrategy.<MessageDto>forBoundedOutOfOrderness(Duration.ofSeconds(5))
								.withTimestampAssigner((event, timestamp) -> event.getTimestamp()),
						"Kinesis data-stream"
				)
				.returns(MessageDto.class)
				.uid("source-id");

		kinesisRecordsWithEventTimeWatermarks
				.filter(Objects::nonNull)
				.filter(dto -> dto.getContent() != null)
				.map(element -> {
					final MessageModel messageModel = new MessageModel();
					messageModel.setId(element.getId());
					messageModel.setContent(element.getContent());
					messageModel.setTimestamp(element.getTimestamp());
					messageModel.setAuthor(element.getAuthor());
					if (element.getContent() != null) {
						messageModel.setCharacters(element.getContent().length());
					}
					return messageModel;
				})
				.filter(message -> message.getCharacters() <= 100)
						.sinkTo(new AppSyncEventsSink());

		System.out.println(env.getExecutionPlan());

		// Execute program, beginning computation.
		env.execute("Flink Chat Room Processing");
	}

	private static Map<String, Properties> getApplicationProperties() throws IOException {
		Map<String, Properties> applicationProperties = KinesisAnalyticsRuntime.getApplicationProperties();

		if (applicationProperties.isEmpty()) {
			final Properties influxDbProperties = new Properties();
			influxDbProperties.put("token", "");
			influxDbProperties.put("url", "");
			influxDbProperties.put("default.bucket", "my-bucket");
			influxDbProperties.put("organisation", "my-org");

			final Properties kinesisProperties = new Properties();
			kinesisProperties.put("data.pipeline.arn", "arn:aws:kinesis:us-east-1:635186394528:stream/jena-training");

			applicationProperties = Map.ofEntries(
					Map.entry("influxdb", influxDbProperties),
					Map.entry("kinesis", kinesisProperties)
			);
		}

		return applicationProperties;
	}
}
