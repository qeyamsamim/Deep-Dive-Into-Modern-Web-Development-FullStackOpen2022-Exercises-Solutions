const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const posts = await Blog
    .find({})
    .find({}).populate('user', {
    username: 1, name: 1, id: 1
  })
  res.json(posts)
})
  
blogRouter.post('/', async (req, res) => {

  const body = req.body
  const decodedToken = req.user
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!(body.title && body.url)) {
    return res.status(400).json({error: 'Title and url are required'})
  }
    
  const post = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  
  const savedBlog = await post.save()
  user.blogs = user.blogs.concat(post)
  await user.save()

  res.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
 
  const decodedToken = req.user
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(req.params.id)

  if (!blog ) {
    return res.status(204).end()
  }

  if (blog.user && blog.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'Invalid user.' })
  }
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const body = req.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedPost = await Blog.findByIdAndUpdate(req.params.id, post, { new: true })
  res.status(204).json(updatedPost)
})

module.exports = blogRouter;