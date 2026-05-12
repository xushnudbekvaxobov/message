package message.securitymessage.service;

import message.securitymessage.dto.MessageRequest;
import message.securitymessage.dto.response.MessageResponse;

public interface MessageService {

    MessageResponse createMessage(MessageRequest request);
    String readMessage(String url);
}
