package com.congnidata.converse.entities;
import java.time.LocalDateTime;

public class ChatMessage {
    private String content;
    private String sender;
    private LocalDateTime timestamp;

    // Constructors, getters, and setters

    public ChatMessage() {
    }

    public ChatMessage(String content, String sender) {
        this.content = content;
        this.sender = sender;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and setters
    // You can generate getters and setters using your IDE or manually.

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}

