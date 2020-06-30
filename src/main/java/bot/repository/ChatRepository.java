package bot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bot.domain.Chat;

/**
 * Spring Data JPA repository for the Chat entity.
 */
public interface ChatRepository extends JpaRepository<Chat, Long> {



	@Query(value = "select  distinct Chat from Chat Chat")
	List<Chat> findAllMessages();
	
	
}
