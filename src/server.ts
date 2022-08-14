import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {config} from './config/config'
import Logging from "./library/Logging";
import authorRoutes from './routes/Author'
import bookRoutes from './routes/Book'

const router = express()

// Connect to mongodb
mongoose.connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
})
    .then(() => {
        Logging.info(`Connected to mongoDB`)
        StartServer()
    })
    .catch((err) => {
        Logging.error(`Unable to connect mongoDB`)
        Logging.error(err)
    })
// Only start server if connected mongoDB
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the request
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - Ip: [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
            // Log the response
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - Ip: [${req.socket.remoteAddress} - Status: [${res.statusCode}]`)
        })

        next()
    })

    router.use(express.urlencoded({extended: true}))

    router.use(express.json())

    // Rule of out API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }

        next()
    })

    // Routes
    router.use('/authors', authorRoutes)
    router.use('/books', bookRoutes)

    // Health check
    router.get('/ping', (req, res, next) => {
        res.status(200).json({
            message: 'pong'
        })
    })

    // Error handling
    router.use((req, res, next) => {
        const error = new Error('Not found')
        Logging.error(error)

        return res.status(404).json({
            message: error.message
        })
    })

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`)
    })
}