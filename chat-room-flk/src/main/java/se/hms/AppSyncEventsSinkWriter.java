package se.hms;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.api.connector.sink2.SinkWriter;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.List;

public class AppSyncEventsSinkWriter implements SinkWriter<MessageModel> {

	HttpClient httpClient = HttpClient.newBuilder().build();
	ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void close() throws Exception {
		//nothing to do
	}

	@Override
	public void write(final MessageModel element, final Context context) throws IOException, InterruptedException {

		final AppSyncEventModel appSyncEventModel = new AppSyncEventModel();
		appSyncEventModel.setChannel("/default/chatroom");
		appSyncEventModel.setEvents(List.of(
				objectMapper.writeValueAsString(element)
		));

		try {
			HttpRequest request = HttpRequest.newBuilder()
					.uri(new URI("https://q5ckogzm75cwzlkl45yp4koibm.appsync-api.us-east-1.amazonaws.com/event"))
					.headers("Content-Type", "application/json")
					.headers("x-api-key", "da2-xksnily5evdyfg7zk2jyxkiw5y")
					.POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(appSyncEventModel)))
					.build();

			httpClient.send(request, BodyHandlers.ofString());
		} catch (URISyntaxException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void flush(final boolean endOfInput) throws IOException, InterruptedException {
		//nothing to do
	}
}
