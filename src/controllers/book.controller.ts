import mongoose from "mongoose";
import {Request, Response, NextFunction} from 'express'
import {Book} from "../models";

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const {title, author} = req.body

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author: new mongoose.Types.ObjectId(author)
    })

    return book.save().then((book) => {
        res.status(201).json({book})
    }).catch((error) => {
        res.status(500).json({error})
    })
}

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId).then((book) => {
        book ? res.status(200).json({book}) : res.status(400).json({
            message: 'Not found'
        })
    })
        .catch((error) => {
            return res.status(500).json({error})
        })
}

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .then((books) => {
            return res.status(200).json({books})
        })
        .catch((error) => {
            return res.status(500).json({error})
        })
}

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId

    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body)
                return book
                    .save()
                    .then((book) => {
                        res.status(201).json({book})
                    })
                    .catch((error) => {
                        res.status(500).json({error})
                    })
            } else {
                res.status(404).json({
                    message: 'Not found'
                })
            }
        })
}

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId

    return Book.findByIdAndDelete(bookId)
        .then((book) => {
            book ? res.status(201).json({
                message: 'Deleted'
            }) : res.status(404).json({
                message: 'Not found'
            })
        })
}

export default { createBook, readBook, readAll, updateBook, deleteBook }
