import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import { MONGO_URI } from "../config.js";

await mongoose.connect(MONGO_URI);
await Book.collection.deleteMany({});
console.log("Manual query completed");
await mongoose.disconnect();
