package labs.bookstore.service.interfejs;

import labs.bookstore.model.enumerations.Category;

import java.util.List;

public interface CategoryService {
    List<Category> findAll();
}
