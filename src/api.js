const router = require('express').Router();
const books = require('./books');

let booksDirectory = books;


router.get('/books', function(req, res) {
    res.send(booksDirectory);
});

router.get('/books/:id', function(req, res) {
    const {id} = req.params; 

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('404 Error - Book Not Found :(');

    res.send(book);
});

router.post('/books', function(req, res) {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const bookExist = booksDirectory.find(b =>b.isbn === isbn);
    if (bookExist) return res.send("Book Already Exists!");

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    };
    booksDirectory.push(book);

    res.send(book);
});

router.put('/books/:id', function(req, res) {
    const {id} = req.params;
    const {
        title,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.send("Book Does Not Exist!");


    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    };

    const bookIndex = booksDirectory.findIndex(b => b.isbn === id);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.send(updatedBook);

});

router.delete('/books/:id', function(req, res) {
    const {id} = req.params;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send("404 Error, Book Does Not Exist! :(");

    booksDirectory = booksDirectory.filter(b => b.isbn !== id);

    res.send("Success");
});

module.exports = router;