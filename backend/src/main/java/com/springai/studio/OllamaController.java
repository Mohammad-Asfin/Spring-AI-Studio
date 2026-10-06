package com.springai.studio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ollama")
@CrossOrigin("*")
public class OllamaController {

    private static final Logger log = LoggerFactory.getLogger(OllamaController.class);
    private final ChatClient chatClient;

    public OllamaController(OllamaChatModel chatModel) {
        this.chatClient = ChatClient.create(chatModel);
    }

    @PostMapping("/ask")
    public ResponseEntity<String> getAnswer(@RequestBody Map<String, String> payload) {
        String message = payload.get("prompt");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt cannot be empty");
        }
        try {
            ChatResponse chatResponse = chatClient.prompt(message).call().chatResponse();
            if (chatResponse != null && chatResponse.getMetadata() != null) {
                log.info("Model used: {}", chatResponse.getMetadata().getModel());
            }

            String response = chatResponse != null && chatResponse.getResult() != null
                    && chatResponse.getResult().getOutput() != null
                            ? chatResponse.getResult().getOutput().getText()
                            : "Empty response";
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error calling Ollama", e);
            return ResponseEntity.internalServerError().body("Error from Ollama: " + e.getMessage());
        }
    }
}
