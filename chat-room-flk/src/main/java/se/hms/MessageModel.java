package se.hms;

import lombok.Data;

@Data
public class MessageModel {
	private String content;
	private long timestamp;
	private String author;
	private String id;

	private int characters;
}
