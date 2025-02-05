package se.hms;

import lombok.Data;

@Data
public class MessageDto {
	private String content;
	private long timestamp;
	private String author;
	private String id;
}
