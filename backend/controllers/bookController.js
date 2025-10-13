import { Book } from '../models/bookModel.js'

// Get all books
export async function getAllBooks(req, res) {
    try {
        const books = await Book.find()
        res.json({count: books.length, data: books})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}

// Get a single book by id
export async function getBookById(req, res) {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({error: "Book not found"})
        }
        res.json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}

// Add a book
export async function addBook(req, res) {
    try {
        const book = await Book.create(req.body)
        res.status(201).json({message: "Book added successfully", book})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}

// Update a book by id
export async function updateBookById(req, res) {
    try {
        const { id } = req.params
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            {new: true, runValidators: true}
        )
        if (!updatedBook) {
            return res.status(404).json({error: "Book not found"})
        }
        res.json({message: "Book updated successfully", updatedBook})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}

// Delete a book by id
export async function deleteBookById(req, res) {
    try {
        const { id } = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
            return res.status(404).json({error: "Book not found"})
        }
        res.json({message: "Book deleted successfully", deletedBook})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
}