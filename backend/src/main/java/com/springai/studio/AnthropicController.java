package com.springai.studio;

import org.springframework.ai.anthropic.AnthropicChatModel;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/anthropic")
@CrossOrigin("*")
public class AnthropicController {

    private final ChatClient chatClient;

    public AnthropicController(AnthropicChatModel chatModel) {
        this.chatClient = ChatClient.create(chatModel);
    }

    @PostMapping("/ask")
    public ResponseEntity<String> getAnswer(@RequestBody Map<String, String> payload) {
        String message = payload.get("prompt");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt cannot be empty");
        }
        try {
            String response = chatClient.prompt(message).call().content();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error from Anthropic: " + e.getMessage());
        }
    }
}
