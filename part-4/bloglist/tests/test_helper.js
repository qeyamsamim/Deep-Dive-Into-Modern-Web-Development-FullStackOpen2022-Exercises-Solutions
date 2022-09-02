const Blog = require('../models/blog')
const User = require('../models/user')

const initialPosts = [
    {
        title: "Programming",
        author: "Samim",
        url: "some url",
        likes: 5
    },
    {
        title: "JavaScript Programming",
        author: "Samim Qeyam",
        url: "some url",
        likes: 9
    },
    {
        title: "Node.js Programming",
        author: "Samim Qeyam",
        url: "some url",
        likes: 4
    }
]

const postsInDb = async () => {
    const posts = await Blog.find({})
    return posts.map(post => post.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { initialPosts, postsInDb, usersInDb }