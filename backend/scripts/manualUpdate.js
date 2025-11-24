import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import { MONGO_URI } from "../config.js";

console.log("Loaded MONGO_URI:", JSON.stringify(MONGO_URI));


// Deletes ALL documents
await mongoose.connect(MONGO_URI);
await Book.deleteMany()
await Book.insertMany([
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        author: "J. K. Rowling",
        year: 2000
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960
    },
    {
        title: "The Lord of the Rings",
        author: "JRR Tolkien",
        year: 1954
    },
    {
        title: "The Handmaid's Tale",
        author: "Margaret Atwood",
        year: 1985
    },
    {
        title: "Diary of a Wimpy Kid",
        author: "Jeff Kinney",
        year: 2007
    },
]);
console.log("Manual query completed");
await mongoose.disconnect();
