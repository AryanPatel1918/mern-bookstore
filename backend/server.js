import express from "express"
import mongoose from "mongoose"
import { PORT, MONGO_URI } from "./config.js"
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors"

const app = express()

// middleware to parse JSON request body
app.use(express.json())

// middleware to handle CORS policy
// option 1: allow all origins
// app.use(cors()) 
// option 2: only allow requests from React app
app.use(cors({ 
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}))

app.use('/books', bookRoutes)

app.get('/', (req, res) => {
    res.send("Welcome to MERN Bookstore")
})

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully")
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`)
        })
    })
    .catch((error) => console.log("MongoDB connection error:", error.message))