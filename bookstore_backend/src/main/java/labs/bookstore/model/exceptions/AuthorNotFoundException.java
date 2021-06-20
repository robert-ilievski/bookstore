package labs.bookstore.model.exceptions;

public class AuthorNotFoundException extends RuntimeException{
    public AuthorNotFoundException(){
        super("Author not found");
    }
}
