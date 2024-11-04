const _ = require('lodash')

// const dummy = blogs => {       // Commented cause of eslint
const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })

  return sum
}

const favoriteBlog = blogs => {
  blogs.sort((b1, b2) => b2.likes - b1.likes)   // Sort by value (works with integers)

  return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }
}

// 4.6*: Helper Functions and Unit Tests, step 4
const mostBlogs = (blogs) => {

  // Creates an object where each key is an author, and
  // each value is the count of blogs by that author.
  const blogsByAuthor = _.countBy(blogs, 'author')

  // Finds the author with the maximum blog count.
  const maxAuthor = _.maxBy(_.keys(blogsByAuthor), (author) => blogsByAuthor[author])

  return {
    author: maxAuthor,
    blogs: blogsByAuthor[maxAuthor],
  }
}

// 4.7*: Helper Functions and Unit Tests, step 5
const mostLikes = (blogs) => {
  const likesByAuthor = _(blogs)
    .groupBy('author')                                          // Groups the blogs by each author.
    .mapValues((authorBlogs) => _.sumBy(authorBlogs, 'likes'))  // For each author, sum up the likes across all their blogs.
    .value()

  // Determines which author has the highest number of total likes.
  const maxAuthor = _.maxBy(_.keys(likesByAuthor), (author) => likesByAuthor[author])

  return {
    author: maxAuthor,
    likes: likesByAuthor[maxAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}