const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const PORT = 8000

const app = express()
const urlToScrape = 'https://stackoverflow.com/questions'

axios(urlToScrape)
  .then(response => {
		const html = response.data
		const $ = cheerio.load(html)
		const articles = []

		$('.question-hyperlink', html).each(function() {
			const title = $(this).text()
			const url = $(this).attr('href')
			articles.push({
				title: title,
				url: url,
			})
		})
		console.log(articles)

	}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))