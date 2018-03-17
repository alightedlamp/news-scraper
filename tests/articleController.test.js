import * as articleController from '../src/controllers/articleController'

describe('Article Controller - Handlers', () => {
  describe('populate', () => {
    it('should exist', () => {
      expect(articleController.populate())
    })
  })
  describe('getOne', () => {
    it('should exist', () => {})
    it('should return one result', () => {
      const expected = {
        title: expect.any(String),
        author: expect.any(String),
      }
      return expect(articleController.getOne()).resolves.toEqual(expect.objectContaining(expected))
    })
    it('should error on invalid input', () => {})
  })
  it('should return a list of results', () => {
    const expected = {
      title: expect.any(String),
      author: expect.any(String),
    }
    expect(articleController.getAll()).toEqual(expect.arrayContaining(expected))
  })
  // test('getSaved', () => {
  //   const user_id = 1
  //   const expected = {
  //     title: expect.any(String),
  //     author: expect.any(String),
  //   }
  //   expect(articleController.getSaved())
  // })
})

// describe('Article Controller - API Routes', () => {
//   test('getAllArticles', () => {
//     expect(articleController.getAllArticles())
//   test('getArticleById', () => {
//     const id = '_1'
//     expect(articleController.getArticleById(id))
//   })
// })

// describe('Article Controller - HTML Routes', () => {
//   test('renderHome', () => {
//     expect(articleController.renderHome())
//   })
//   test('renderSaved', () => {
//     expect(articleController.renderSaved())
//   })
//   test('renderOne', () => {
//     expect(articleController.renderOne())
//   })
// })
