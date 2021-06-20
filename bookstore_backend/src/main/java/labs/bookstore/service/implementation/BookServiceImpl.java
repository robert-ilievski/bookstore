package labs.bookstore.service.implementation;

import labs.bookstore.model.dto.BookDto;
import labs.bookstore.model.entities.Author;
import labs.bookstore.model.entities.Book;
import labs.bookstore.model.exceptions.AuthorNotFoundException;
import labs.bookstore.model.exceptions.BookNotFoundException;
import labs.bookstore.repository.AuthorRepository;
import labs.bookstore.repository.BookRepository;
import labs.bookstore.service.interfejs.BookService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository,
                           AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Book> findAll() {
        return this.bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Long id) {
        Optional<Book> book = this.bookRepository.findById(id);
        return book;
    }

    @Override
    @Transactional
    public Optional<Book> save(BookDto bookDto) {
        Author author = this.authorRepository.findById(bookDto.getAuthorId())
                .orElseThrow(AuthorNotFoundException::new);
        Book newBook = new Book(bookDto.getName(), bookDto.getCategory(), author, bookDto.getAvailableCopies());
        return Optional.of(this.bookRepository.save(newBook));
    }

    @Override
    @Transactional
    public Optional<Book> edit(Long id, BookDto bookDto) {
        Book book = this.bookRepository.findById(id).orElseThrow(BookNotFoundException::new);
        Author author = this.authorRepository.findById(bookDto.getAuthorId())
                .orElseThrow(AuthorNotFoundException::new);

        book.setName(bookDto.getName());
        book.setAuthor(author);
        book.setCategory(bookDto.getCategory());
        book.setAvailableCopies(bookDto.getAvailableCopies());

        this.bookRepository.save(book);
        return Optional.of(book);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        this.bookRepository.deleteById(id);

    }

    @Override
    @Transactional
    public void markAsTaken(Long id) {
        Book book = this.bookRepository.findById(id).orElseThrow(BookNotFoundException::new);
        Integer quantity = book.getAvailableCopies();

        book.setAvailableCopies(quantity-1);
        this.bookRepository.save(book);
    }
}
