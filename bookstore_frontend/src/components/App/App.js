import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Header from '../Header/header'
import Books from "../Books/BookList/books";
import Categories from '../Categories/CategoryList/categories'
import LibraryService from "../../repository/libraryRepository";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}/>

                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd categories={this.state.categories}
                                     authors={this.state.authors}
                                     onAddBook={this.addBook}/>}/>

                        <Route path={"/books/edit/:bookId"} exact render={() =>
                            <BookEdit book={this.state.selectedBook}
                                      categories={this.state.categories}
                                      authors={this.state.authors}
                                      onEditBook={this.editBook}/>}/>

                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books}
                                   onMarkAsTaken={this.markAsTaken}
                                   onDelete={this.deleteBook}
                                   onEdit={this.getBook}/>}/>

                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    addBook = (name, category, authorId, availableCopies) => {
        LibraryService.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (bookId) => {
        LibraryService.getBook(bookId)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (bookId, name, category, authorId, availableCopies) => {
        LibraryService.editBook(bookId, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    markAsTaken = (bookId) => {
        LibraryService.markAsTaken(bookId)
            .then(() => {
                this.loadBooks();
            });
    }

    deleteBook = (bookId) => {
        LibraryService.deleteBook(bookId)
            .then(() => {
                this.loadBooks();
            });
    }
}

export default App;
