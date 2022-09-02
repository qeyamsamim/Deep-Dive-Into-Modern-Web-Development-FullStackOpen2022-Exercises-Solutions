const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('../tests/test_helper')
const bcrypt = require('bcryptjs')

describe('when there is one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const saltRounds = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash('samim', saltRounds)

        const user = new User({username: 'samjan', name: 'samim', passwordHash})

        await user.save()
    }, 100000)

    test('creation succeeds with a fresh username', async () => {
        const usersBefore = await helper.usersInDb()

        const newUser = {
            username: 'samimjan',
            name: 'samim',
            passwordHash: 'samjan'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toHaveLength(usersBefore.length + 1)

        const usernames = usersAfter.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    }, 100000)

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersBefore = await helper.usersInDb()
        
        const newUser = {
          username: 'samjan',
          name: 'Superuser',
          passwordHash: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAfter = await helper.usersInDb()
        expect(usersAfter).toEqual(usersBefore)
    }, 100000)
})