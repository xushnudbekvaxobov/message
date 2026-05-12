package message.securitymessage.service.serviceImpl;

import message.securitymessage.exception.BadCreationalException;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.security.SecureRandom;

@Service
public class TokenService {
    private static final String security = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private final SecureRandom secureRandom = new SecureRandom();

    public String generateToken(){
        StringBuilder token = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            int index = secureRandom.nextInt(security.length());
            token.append(security.charAt(index));
        }
        return token.toString();
    }

    public String extractToken(String url) {
        if (url == null){
            throw new BadCreationalException("URL cannot be null");
        }
        try{
            URI uri = URI.create(url);
            String path = uri.getPath();
            if (!path.startsWith("/s/")) {
                throw new BadCreationalException("Invalid URL format");
            }
            String token = path.substring("/s/".length());
            if (token.isBlank()){
                throw new BadCreationalException("Token cannot be blank");
            }
            return token;
        }catch (Exception e){
            throw new BadCreationalException("Invalid URL format");
        }
}
}
