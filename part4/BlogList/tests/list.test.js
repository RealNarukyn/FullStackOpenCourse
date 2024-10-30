const { test, describe } = require('node:test')
const assert = require('node:assert')

const { blogs } = require('../utils/defines')
const listHelper = require('../utils/list_helper')



/**
 *
 * *strictEqual:
 *  Checks if two variables point to the exact same
 *  object or value in memory.
 *
 * *deepStrictEqual:
 *  Checks if two variables have the same content and structure,
 *  even if they’re different objects in memory.
 *
 * Use strictEqual for exact matches, and deepStrictEqual when
 * comparing similar-looking objects or arrays.
 *
 */

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favourite blog', () => {
  test('get the most liked blog', () => {
    const blog = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(blog,
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      })
  })
})

// TODO: 4.6*: Helper Functions and Unit Tests, step 4

// TODO: 4.7*: Helper Functions and Unit Tests, step 5