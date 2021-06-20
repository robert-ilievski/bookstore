package labs.bookstore.web;

import labs.bookstore.model.dto.BookDto;
import labs.bookstore.model.entities.Book;
import labs.bookstore.service.interfejs.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BooksController {

    private final BookService bookService;

    public BooksController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> listAllBooks(){
        return this.bookService.findAll();
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> findById(@PathVariable Long bookId) {
        return this.bookService.findById(bookId)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody BookDto bookDto) {
        return this.bookService.save(bookDto)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{bookId}")
    public ResponseEntity<Book> editBook(@PathVariable Long bookId, @RequestBody BookDto bookDto) {
        return this.bookService.edit(bookId, bookDto)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/mark-as-taken/{bookId}")
    public ResponseEntity<Book> markAsTaken(@PathVariable Long bookId){
        if (this.bookService.findById(bookId).isEmpty())
            return ResponseEntity.badRequest().build();
        this.bookService.markAsTaken(bookId);
        return ResponseEntity.ok().body(this.bookService.findById(bookId).get());
    }

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<Book> deleteById(@PathVariable Long bookId) {
        this.bookService.deleteById(bookId);
        if(this.bookService.findById(bookId).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}
