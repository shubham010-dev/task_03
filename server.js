const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let books = [
    { id: 1, title: "A Suitable Boy", author: "Vikram Seth"},
    { id: 2, title: "Train to Pakistan", author: "Khushwant Singh"}
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = books.find(b => b.id == id);

    if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id != id);
    res.json({ message: "Book deleted" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
