import express from "express"
import { getAllBooks, getBookById, addBook, updateBookById, deleteBookById } from "../controllers/bookController.js"

const router = express.Router()

router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.post('/', addBook)
router.put('/:id', updateBookById)
router.delete('/:id', deleteBookById)

export default router