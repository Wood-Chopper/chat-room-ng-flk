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
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;
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



		// Execute program, beginning computation.
		env.execute("Flink Chat Room Processing");
	}

	private static Map<String, Properties> getApplicationProperties() throws IOException {
		Map<String, Properties> applicationProperties = KinesisAnalyticsRuntime.getApplicationProperties();

		if (applicationProperties == null) {
			final Properties influxDbProperties = new Properties();
			influxDbProperties.put("token", "");
			influxDbProperties.put("url", "");
			influxDbProperties.put("default.bucket", "my-bucket");
			influxDbProperties.put("organisation", "my-org");

			final Properties kinesisProperties = new Properties();
			kinesisProperties.put("data.pipeline.arn", "");

			applicationProperties = Map.ofEntries(
					Map.entry("influxdb", influxDbProperties),
					Map.entry("kinesis", kinesisProperties)
			);
		}

		return applicationProperties;
	}
}
