package com.springai.studio;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/openai")
@CrossOrigin("*")
public class OpenAIController {

    private final ChatClient chatClient;

    public OpenAIController(OpenAiChatModel chatModel) {
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
            return ResponseEntity.internalServerError().body("Error from OpenAI: " + e.getMessage());
        }
    }
}
