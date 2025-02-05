package se.hms;

import lombok.Data;

import java.util.List;

@Data
public class AppSyncEventModel {
	private String channel;
	private List<String> events;
}
