import axios from "../custom-axios/axios";

const bookService = {
    fetchAuthors: () => {
        return axios.get("/authors");
    },

    fetchCountries: () => {
        return axios.get("/countries")
    },

    fetchBooks: () => {
        return axios.get("/books")
    },
    fetchCategories: () => {
        return axios.get("/books/categories")
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`)
    },
    markAsTaken: (id) => {
        return axios.post(`/books/taken/${id}`)
    },
    addBook: (name, category, author, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        })
    },
    editBook: (id,name, category, author, availableCopies) => {
        return axios.put( `/books/edit/${id}`, {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        })
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`)
    }

}
export default bookService;