import express from "express"
import mongoose from "mongoose"
import { PORT, MONGO_URI } from "./config.js"
import { Book } from './models/bookModel.js'

const app = express()

// middleware to parse JSON request body
app.use(express.json())

app.get('/', (req, res) => {
    res.send("home page")
})

// Add a book
app.post('/books', async (req, res) => {
    try {
        const book = await Book.create(req.body)
        res.status(201).json({message: "Book added successfully", book})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message})
    }
})

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully")
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`)
        })
    })
    .catch((error) => console.log("MongoDB connection error:", error.message))