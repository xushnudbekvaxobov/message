package message.securitymessage.controller;

import lombok.RequiredArgsConstructor;
import message.securitymessage.dto.MessageRequest;
import message.securitymessage.dto.response.ApiResponse;
import message.securitymessage.service.MessageService;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResponse<?>> createMessage(@RequestBody MessageRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Message created successfully", messageService.createMessage(request), 201));
    }

    @PostMapping("/reveal-by-url")
    public ResponseEntity<ApiResponse<?>> revealByUrl(@RequestBody Map<String, String> body) {
        String url = body.get("url");
        String content = messageService.readMessage(url);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResponse<>(true, "Message revealed successfully", content, 200));
    }
}
