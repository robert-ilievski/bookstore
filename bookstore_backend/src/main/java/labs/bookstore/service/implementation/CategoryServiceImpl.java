package labs.bookstore.service.implementation;

import labs.bookstore.model.enumerations.Category;
import labs.bookstore.service.interfejs.CategoryService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Override
    public List<Category> findAll() {
        List<Category> categories = Arrays.asList(Category.values());
        return categories;
    }
}
