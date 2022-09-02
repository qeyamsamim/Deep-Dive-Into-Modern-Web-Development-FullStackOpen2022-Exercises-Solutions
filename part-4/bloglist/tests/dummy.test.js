const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listHelper.emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.blogList)
    expect(result).toBe(41)
  })

})

describe('favorite blog', () => {

  test('favorite blog is', () => {
    const result = listHelper.favoriteBlog(listHelper.blogList)
    expect(result).toEqual(
      {
        _id: 'aslkdf12l99;l;alsadjf',
        title: 'Title Two',
        author: 'Edsger W. Dijkstra',
        url: 'again some url here',
        likes: 18,
        __v: 0
      }
    )
  })
})

describe('Authors with most blogs and likes', () => {
  
})