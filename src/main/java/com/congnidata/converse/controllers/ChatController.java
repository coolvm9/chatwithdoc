package com.congnidata.converse.controllers;

import com.congnidata.converse.entities.ChatMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @GetMapping("/chat")
    public String chatPage() {
        return "chat"; // Thymeleaf template name for the chat page
    }

    @GetMapping("/summarization")
    public String summarizationPage() {
        return "summarization"; // Thymeleaf template name for the summarization page
    }

    @GetMapping("/extractEntities")
    public String extractEntitiesPage() {
        return "extractEntities"; // Thymeleaf template name for the extract entities page
    }

/*    @ResponseBody
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessage message) {
        ChatMessage responseMessage = new ChatMessage();
        responseMessage.setSender("Satya");
        responseMessage.setTimestamp(LocalDateTime.now());
        responseMessage.setContent("Your Request :: " + message.getContent() + "\nAnswer");

        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }*/
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
   public ChatMessage sendMessage(ChatMessage message) {
        message.setSender("Satya");
        System.out.println(message.getContent());
        message.setContent("Your Request ::  " + message.getContent().replace("\n", "[NEWLINE]") + " \n  Answer");
        return message;
    }

    @MessageMapping("/summarization.sendMessage")
    @SendTo("/topic/summarization")
    public ChatMessage sendSummarizationMessage(ChatMessage message) {
        // Process message for summarization
        message.setSender("Satya");
        System.out.println(message.getContent());
        message.setContent("Your Request ::  " + message.getContent().replace("\n", "[NEWLINE]") + " \n  Summary");
        return message;
    }

    @MessageMapping("/extractEntities.sendMessage")
    @SendTo("/topic/extractEntities")
    public ChatMessage sendExtractEntitiesMessage(ChatMessage message) {
        message.setSender("Satya");
        System.out.println(message.getContent());
        message.setContent("Your Request ::  " + message.getContent().replace("\n", "[NEWLINE]") + " \n  Entities");
        return message;
    }
}
