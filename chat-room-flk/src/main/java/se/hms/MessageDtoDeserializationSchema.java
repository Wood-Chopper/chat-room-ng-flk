package se.hms;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.flink.api.common.serialization.DeserializationSchema;
import org.apache.flink.api.common.typeinfo.TypeInformation;

import java.io.IOException;

public class MessageDtoDeserializationSchema implements DeserializationSchema<MessageDto> {

	private static final ObjectMapper objectMapper = new ObjectMapper()
			.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);


	@Override
	public MessageDto deserialize(final byte[] message) throws IOException {
		return objectMapper.readValue(message, MessageDto.class);
	}

	@Override
	public TypeInformation<MessageDto> getProducedType() {
		return TypeInformation.of(MessageDto.class);
	}

	@Override
	public boolean isEndOfStream(final MessageDto nextElement) {
		return false;
	}
}
