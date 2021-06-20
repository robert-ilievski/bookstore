import axios from "../custom-axios/axios";

const LibraryService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchAuthors: () => {
        const authors = axios.get("/authors");
        return authors;
    },
    getBook: (bookId) => {
        return axios.get(`/books/${bookId}`);
    },
    deleteBook: (bookId) => {
        return axios.delete(`/books/delete/${bookId}`);
    },
    addBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/add", {
            "name" : name,
            "category" : category,
            "authorId" : authorId,
            "availableCopies" : availableCopies
        });
    },
    editBook: (bookId, name, category, authorId, availableCopies) => {
        return axios.put(`/books/edit/${bookId}`, {
            "name" : name,
            "category" : category,
            "authorId" : authorId,
            "availableCopies" : availableCopies
        });
    },
    markAsTaken: (bookId) => {
        return axios.put(`/books/mark-as-taken/${bookId}`);
    }
}

export default LibraryService;