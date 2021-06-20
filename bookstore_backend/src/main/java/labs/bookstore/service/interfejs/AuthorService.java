package labs.bookstore.service.interfejs;

import labs.bookstore.model.entities.Author;

import java.util.List;

public interface AuthorService {

    List<Author> findAll();
}
