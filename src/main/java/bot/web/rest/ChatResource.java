package bot.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import bot.domain.Chat;
import bot.repository.ChatRepository;

/**
 * REST controller for managing mesgs Chat.
 */
@RestController
@RequestMapping(value = "/backEndChat")
public class ChatResource {

	private final Logger log = LoggerFactory.getLogger(ChatResource.class);

	@Inject
	private ChatRepository chatRepository;

	/**
	 * 
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Chat>> getAllChats() throws URISyntaxException {
		log.debug("REST request to get a page of Chat");
		List<Chat> list = chatRepository.findAllMessages();
		
		return new ResponseEntity<>(list, null, HttpStatus.OK);
	}

	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Chat> getMessage(@PathVariable Long id) {
		log.debug("REST request to get Message : {}", id);
		Chat messa = chatRepository.findById(id).get();
		return Optional.ofNullable(messa).map(result -> new ResponseEntity<>(result, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}


	/**
	 * 
	 * @param mess
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Chat> createMessage(@Valid @RequestBody Chat mess) throws URISyntaxException {
		log.debug("REST request to save Message : {}", mess);

		Chat result = chatRepository.save(mess);
		return ResponseEntity.created(new URI("/backEndChat/" + result.getId())).body(result);
	}
}
