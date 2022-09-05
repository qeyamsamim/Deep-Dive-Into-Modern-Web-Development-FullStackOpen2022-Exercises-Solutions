const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const {requestLogger, errorHandler, unknownEndpoint, tokenExtractor} = require('./utils/middleware')

const server = http.createServer(app)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB: ", error.message)
    })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', tokenExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)
app.use(unknownEndpoint)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

module.exports = app