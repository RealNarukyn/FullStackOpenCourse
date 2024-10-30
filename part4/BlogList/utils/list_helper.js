const dummy = blogs => {
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

// TODO: 4.6*: Helper Functions and Unit Tests, step 4
const mostBlogs = () => {}

// TODO: 4.7*: Helper Functions and Unit Tests, step 5
const mostLikes = () => {}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}