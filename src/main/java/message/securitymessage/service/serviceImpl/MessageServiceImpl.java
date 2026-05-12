package message.securitymessage.service.serviceImpl;

import lombok.RequiredArgsConstructor;
import message.securitymessage.dto.MessageRequest;
import message.securitymessage.dto.response.MessageResponse;
import message.securitymessage.entity.MessageEntity;
import message.securitymessage.entity.enums.MessageStatus;
import message.securitymessage.exception.AppBadException;
import message.securitymessage.exception.BadCreationalException;
import message.securitymessage.repository.MessageRepository;
import message.securitymessage.service.MessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final TokenService tokenService;
    private final MessageRepository messageRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    public MessageResponse createMessage(MessageRequest messageRequest) {
        String token = tokenService.generateToken();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(messageRequest.getExpiresInMinutes());
        MessageEntity messageEntity = MessageEntity.builder()
                .token(token)
                .content(messageRequest.getContent())
                .status(MessageStatus.ACTIVE)
                .expiresAt(expiresAt)
                .build();
        messageRepository.save(messageEntity);
        String link = baseUrl + "/s/" + token;
        return new MessageResponse(link, expiresAt);
    }

    @Override
    public String readMessage(String url) {
        String token = tokenService.extractToken(url);
        MessageEntity messageEntity = messageRepository.findByToken(token)
                .orElseThrow(() -> new BadCreationalException("Message not found"));
        if (messageEntity.getStatus() == MessageStatus.EXPIRED) {
            throw new BadCreationalException("Message has expired");
        }
        if (messageEntity.getStatus() == MessageStatus.VIEWED){
            throw new AppBadException("Message has already been viewed");
        }
        if (messageEntity.getExpiresAt().isBefore(LocalDateTime.now())){
            messageEntity.setStatus(MessageStatus.EXPIRED);
            messageRepository.save(messageEntity);
            throw new AppBadException("Message has expired");
        }
        String content = messageEntity.getContent();
        messageEntity.setStatus(MessageStatus.VIEWED);
        messageRepository.save(messageEntity);
        return content;
    }
}
