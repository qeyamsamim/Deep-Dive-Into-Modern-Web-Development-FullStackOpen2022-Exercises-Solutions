const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../index')
const api = supertest(app)
const Post = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')

// describe('when posts are returned', () => {
    
    beforeEach(async () => {
        await Post.deleteMany({})
        await Post.insertMany(helper.initialPosts)
    }, 100000)

//     test('posts are returned as json', async () => {
//         const response = await api
//             .get('/api/blogs')
//             .expect(200)
//             .expect('Content-Type', /application\/json/)
        
//         expect(response.body).toHaveLength(helper.initialPosts.length)
//     })

//     test('those are identified by field id', async () => {
//         const response = await api
//           .get('/api/blogs')
//           .expect(200)
//           .expect('Content-Type', /application\/json/)
//           expect(response.body[0].id).toBeDefined()
//     })
// })

let token
beforeEach(async () => {
    await User.deleteMany({})

    const saltRounds = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash('sekret', saltRounds)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

    token = response.body.token
}, 100000)

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
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const posts = await helper.postsInDb()

        const title = posts.map(t => t.title)

        expect(posts).toHaveLength(helper.initialPosts.length + 1)
        expect(title).toContain('Hacking')
    })

    test('the missing likes property is zero', async () => {
        const post = {
            title: 'Sam',
            author: 'Sam',
            url: 'some url'
        }
    
        await api
            .post('/api/blogs')
            .send(post)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const posts = await helper.postsInDb()
    
        expect(posts[helper.initialPosts.length].likes).toBe(0)
    })
    
    test('posts without title and url are not added', async () => {
        const post = {
            author: 'Sam',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(post)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)

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
            .set('Authorization', `bearer ${token}`)
            .expect(204)
        
        const postsAfterDelete = await helper.postsInDb()
        expect(postsAfterDelete).toHaveLength(helper.initialPosts.length - 1)

        const titles = postsAfterDelete.map(post => post.title)
        expect(titles).not.toContain(postToDelet.title)
    })
})

describe('Updating posts', () => {
    test('the post is updated', async () => {
        const post = await helper.postsInDb()
        const postToUpdate = post[0]

        const editedBlog = {
            ...postToUpdate,
            likes: 33
        }

        await api
            .put(`/api/blogs/${postToUpdate.id}`)
            .set('Authorization', `bearer ${token}`)
            .send(editedBlog)
            .expect(204)

        const postAfterUpdate = await helper.postsInDb()
        const postatEnd = postAfterUpdate.find(b => b.id === postToUpdate.id)

        expect(postatEnd.likes).toBe(33)
    })
})

afterAll(() => {
    mongoose.connection.close()
})