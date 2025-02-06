package se.hms;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.serialization.DeserializationSchema;
import org.apache.flink.api.common.typeinfo.TypeInformation;

import java.io.IOException;

@Slf4j
public class MessageDtoDeserializationSchema implements DeserializationSchema<MessageDto> {

	private static final ObjectMapper objectMapper = new ObjectMapper()
			.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);


	@Override
	public MessageDto deserialize(final byte[] message) throws IOException {
		try {
			return objectMapper.readValue(message, MessageDto.class);
		} catch (Exception e) {
			log.error(e.getMessage());
			return null;
		}
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
