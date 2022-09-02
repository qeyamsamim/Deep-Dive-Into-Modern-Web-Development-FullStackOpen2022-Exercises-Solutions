const emptyList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234s17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 6,
    __v: 0
  },
  {
    _id: 'aslkdf12l99;l;alskdjf',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'some url',
    likes: 12,
    __v: 0
  },
  {
    _id: 'aslkdf12l99;l;alsadjf',
    title: 'Title Two',
    author: 'Edsger W. Dijkstra',
    url: 'again some url here',
    likes: 18,
    __v: 0
  },
]

const dummy = blogs => {
  return 1;
}

const totalLikes = blogsList => {

  if (blogsList.length === 0) {
    return 0
  } else if (blogsList.length === 1) {
    return blogsList[0].likes
  } else {
    return likes = blogsList.reduce((sum, current) => sum + current.likes, 0)
  }
}

const favoriteBlog = blogsList => {
  return blogsList.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
}

const mostBlogs = blogs => {

}

module.exports = {
  emptyList,
  listWithOneBlog,
  blogList,
  dummy,
  totalLikes,
  favoriteBlog
}