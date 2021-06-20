package labs.bookstore.service.interfejs;

import labs.bookstore.model.dto.BookDto;
import labs.bookstore.model.entities.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {

    List<Book> findAll();
    Optional<Book> findById(Long id);
    Optional<Book> save(BookDto bookDto);
    Optional<Book> edit(Long id, BookDto bookDto);
    void deleteById(Long id);
    void markAsTaken(Long id);
}
