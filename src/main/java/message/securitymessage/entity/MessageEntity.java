package message.securitymessage.entity;

import jakarta.persistence.*;
import lombok.*;
import message.securitymessage.entity.enums.MessageStatus;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "messages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;

        @Column(nullable = false, unique = true, length = 80)
        private String token;

        @Column(columnDefinition = "TEXT")
        private String content;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private MessageStatus status;

        @CreationTimestamp
        @Column(nullable = false)
        private LocalDateTime createdAt;

        @Column(nullable = false)
        private LocalDateTime expiresAt;
    }
