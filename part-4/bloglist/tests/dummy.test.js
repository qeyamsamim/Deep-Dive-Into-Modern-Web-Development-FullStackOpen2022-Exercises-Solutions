const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
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
        author: 'Samim',
        url: 'again some url here',
        likes: 18,
        __v: 0
      }
    )
  })
})

describe('Amost blogs', () => {
  
  const listWithOneBlog = listHelper.blogList.slice(0, 1)

  test('when list is empty, it is undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('when there is one blog, it is the author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(listHelper.blogList[0].author)
  })

  test('Authors with large amounts of blogs', () => {
    const result = listHelper.mostBlogs(listHelper.blogList)
    expect(result).toEqual('Edsger W. Dijkstra')
  })  
})

describe('most likes', () => {

  const listWithOneBlog = listHelper.blogList.slice(0, 1)

  test('when list is empty, it is undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('when list has only one blog, it is the author of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(listHelper.blogList[0].author)
  })

  test('Authors with large amounts of likes', () => {
      const result = listHelper.mostLikes(listHelper.blogList)
      expect(result).toEqual('Samim')
    })
})