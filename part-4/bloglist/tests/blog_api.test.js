const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const Post = require('../models/blog')
const helper = require('../tests/test_helper')

beforeEach(async () => {
    await Post.deleteMany({})
    await Post.insertMany(helper.initialPosts)
}, 100000)

describe('when posts are returned', () => {
    test('posts are returned as json', async () => {
        api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('there are two posts in the blog', async () => {
        const res = await api.get('/api/blogs')

        expect(res.body).toHaveLength(helper.initialPosts.length)
    }, 100000)

    test('the missing likes property is zero', async () => {
        const post = {
            title: 'Sam',
            author: 'Sam',
            url: 'some url'
        }
    
        await api
            .post('/api/blogs')
            .send(post)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const posts = await helper.postsInDb()
    
        expect(posts[helper.initialPosts.length].likes).toBe(0)
    })
})

describe('Addition of posts', () => {
    test('a valid post can be added', async () => {
        const newPost = {
            title: 'Hacking',
            author: 'Ahmad',
            url: 'some url',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const posts = await helper.postsInDb()

        const title = posts.map(t => t.title)

        expect(posts).toHaveLength(helper.initialPosts.length + 1)
        expect(title).toContain('Hacking')
    })
    
    test('posts without title and url are not added', async () => {
        const post = {
            author: 'Sam',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(post)
            .expect(400)

        const posts = await helper.postsInDb()

        expect(posts).toHaveLength(helper.initialPosts.length)
    })
})

describe('deletion of a post', () => {
    test('success with status code 204 if the id is valid', async () => {
        const post = await helper.postsInDb()
        const postToDelet = post[0]

        await api
            .delete(`/api/blogs/${postToDelet.id}`)
            .expect(204)
        
        const postsAfterDelete = await helper.postsInDb()
        
        expect(postsAfterDelete).toHaveLength(helper.initialPosts.length - 1)

        const title = postsAfterDelete.map(post => post.title)

        expect(title).not.toContain(postToDelet.title)
    })
})

// This part does not work.
describe('Updating posts', () => {
    test('the post is updated', async () => {
        const post = await helper.postsInDb()
        const postToUpdate = post[0]

        await api
            .put(`/api/blogs/${postToUpdate.id}`, postToUpdate, { new : true})
            .expect(204)

        const postAfterUpdate = await helper.postsInDb()

        expect(postAfterUpdate[0].likes).toBe(6)
    })
})

afterAll(() => {
    mongoose.connection.close()
})