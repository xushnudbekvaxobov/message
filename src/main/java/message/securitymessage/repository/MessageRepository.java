package message.securitymessage.repository;

import message.securitymessage.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    Optional<MessageEntity> findByToken(String token);
}
