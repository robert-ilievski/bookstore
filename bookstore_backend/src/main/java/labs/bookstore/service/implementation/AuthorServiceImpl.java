package labs.bookstore.service.implementation;

import labs.bookstore.model.entities.Author;
import labs.bookstore.repository.AuthorRepository;
import labs.bookstore.service.interfejs.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Author> findAll() {
        return this.authorRepository.findAll();
    }
}
