import React from "react";
import {Component} from "react";
import bookService from "../../repository/bookRepository";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Author from "../Author/authors";
import Country from "../Country/countries"
import Book from "../Book/BookList/books"
import Header from "../Header/header"
import BookAdd from "../Book/BookAdd/bookAdd"
import BookEdit from "../Book/BookEdit/bookEdit"


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            countries: [],
            books: [],
            categories: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/authors"} exact element={<Author authors={this.state.authors}/>}/>
                            <Route path={"/countries"} exact element={<Country countries={this.state.countries}/>}/>
                            <Route path={"/books/add"} exact
                                   element={<BookAdd authors={this.state.authors} categories={this.state.categories}
                                                     onAdd={this.addBook}/>}/>
                            <Route path={"/books/edit/:id"}
                                   exact
                                   element={<BookEdit authors={this.state.authors} categories={this.state.categories}
                                                      book={this.state.selectedBook} onEditBook={this.editBook}/>}/>
                            <Route path={"/books"} exact
                                   element={<Book books={this.state.books} onDelete={this.deleteBook}
                                                  onTaken={this.markAsTaken} onEdit={this.getBook}/>}/>
                            <Route path={"/"} exact
                                   element={<Book books={this.state.books} onDelete={this.deleteBook}
                                                  onTaken={this.markAsTaken} onEdit={this.getBook}/>}/>
                        </Routes>
                    </div>
                </main>
            </BrowserRouter>
        );
    }

    loadAuthors = () => {
        bookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    loadCountries = () => {
        bookService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            })
    }

    loadBooks = () => {
        bookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }
    loadCategories = () => {
        bookService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    deleteBook = (id) => {
        bookService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    markAsTaken = (id) => {
        bookService.markAsTaken(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name, category, author, availableCopies) => {
        bookService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        bookService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        bookService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }


    componentDidMount() {
        this.loadAuthors();
        this.loadCountries();
        this.loadBooks();
        this.loadCategories()
    }

}

export default App;
