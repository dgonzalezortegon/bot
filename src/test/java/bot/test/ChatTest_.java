package bot.test;

import bot.domain.Chat;
import bot.repository.ChatRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import bot.demo.DemoApplication;

import javax.inject.Inject;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes =DemoApplication.class)
public class ChatTest_ {

    @Inject
    ChatRepository chatRepository;

    @Before
    public void setUp() throws Exception {
    }


    @Test
    public void test1() {

        List<Chat> mesgs = chatRepository.findAll();

        assert(mesgs.size()==1);
    }
}