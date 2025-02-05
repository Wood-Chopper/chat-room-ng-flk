package se.hms;

import org.apache.flink.api.connector.sink2.Sink;
import org.apache.flink.api.connector.sink2.SinkWriter;
import org.apache.flink.api.connector.sink2.WriterInitContext;

import java.io.IOException;

public class AppSyncEventsSink implements Sink<MessageModel> {
	@Override
	public SinkWriter<MessageModel> createWriter(final InitContext context) throws IOException {
		return new AppSyncEventsSinkWriter();
	}

	@Override
	public SinkWriter<MessageModel> createWriter(final WriterInitContext context) throws IOException {
		return new AppSyncEventsSinkWriter();
	}
}
