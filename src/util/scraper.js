import cheerio from 'cheerio'
import axios from 'axios'

import { HACKERNOON_URL, REDDIT_URL, HACKERNEWS_URL } from '../shared/config'
// const FREECODECAMP_URL = 'https://medium.freecodecamp.org/'
// const CSS_TRICKS_URL = 'https://css-tricks.com'
// const SMASHING_MAG_URL = 'https://www.smashingmagazine.com/articles/'
// const CODING_HORROR_URL = 'https://blog.codinghorror.com/'

const scrapeMedium = () =>
  axios
    .get(HACKERNOON_URL)
    .then((response) => {
      const $ = cheerio.load(response.data)

      const data = []
      const parent = $('.postArticle')

      parent.each((i, el) => {
        console.log(el.child('a').attr('href'))
        console.log(el.find('.graf'))
        data.push({
          title: 'test',
          link: 'test',
          score: 10,
          source: 'Hackernoon',
        })
      })
      return data
    })
    .catch(err => new Error(err))

const scrapeReddit = () =>
  axios
    .get(REDDIT_URL)
    .then((response) => {
      const $ = cheerio.load(response.data)

      const data = []

      $('div.link').each((i, el) => {
        const item = $(el).find($('a.title'))
        data.push({
          title: item.text(),
          link: item.attr('href'),
          score: $(el).attr('data-score'),
          source: 'JavaScript Subreddit',
        })
      })
      return data
    })
    .catch(err => new Error(err))

const scrapeHackerNews = () =>
  axios
    .get(HACKERNEWS_URL)
    .then((response) => {
      const $ = cheerio.load(response.data)

      const data = []
      const parent = $('.athing')

      parent.each((i, el) => {
        const item = $(el).find($('.title a'))

        data.push({
          title: item.text(),
          link: item.attr('href'),
          score: $(el)
            .parent('.athing')
            .next()
            .children('.score')
            .text()
            .split(' ')[0],
          source: 'HackerNews',
        })
      })
      return data
    })
    .catch(err => new Error(err))

export default {
  scrapeMedium,
  scrapeReddit,
  scrapeHackerNews,
}
