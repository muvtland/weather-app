const router = require('express').Router()
const config = require('config')
const fetch = require('node-fetch')
const {escape} = require('querystring')

const popular = ['Москва', 'Нью-Йорк', 'Пекин', 'Париж', 'Сидней']

router.get('/:location', async (req, res) => {
    try {
        const location = req.params.location
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${escape(location)}&appid=${config.get('token')}&lang=ru&units=metric`
        const response = await fetch(url)
        const result = await response.json()
        let responseClient
        if (result.cod === 200) {
            responseClient = {
                location: `${result.name}, ${result.sys.country}`,
                temperature: Math.round(result.main.temp)
            }
        } else {
            responseClient = {
                code: 404
            }
        }

        res.json(responseClient)
    } catch (e) {
        res.status(400).json(e)
    }
})

router.post('/temperature', async (req, res) => {
    try {
        const popularNew = []
        const myLocationsNew = []

        const myLocations = req.body

        for (let i = 0; i < popular.length; i++) {
            const location = popular[i]
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${escape(location)}&appid=${config.get('token')}&lang=ru&units=metric`
            const response = await fetch(url)
            const result = await response.json()
            const temp = Math.round(result.main.temp)
            const country = result.sys.country

            popularNew.push({
                location: `${popular[i]}, ${country}`,
                temperature: temp
            })
        }

        for (let i = 0; i < myLocations.length; i++) {
            const location = myLocations[i].location.split(',')[0]
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${escape(location)}&appid=${config.get('token')}&lang=ru&units=metric`
            const response = await fetch(url)
            const result = await response.json()
            const temp = Math.round(result.main.temp)
            myLocationsNew.push({location: myLocations[i].location, temperature: temp})
        }

        const locations = {
            popular: popularNew,
            myLocations: myLocationsNew
        }

        res.json(locations)
    } catch (e) {
        res.status(400).json(e)
    }
})

router.get('/details/:location', async (req, res) => {
    try {
        const location = req.params.location
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${escape(location)}&appid=${config.get('token')}&lang=ru&units=metric`
        const response = await fetch(url)
        const result = await response.json()

        res.json(result)
    } catch (e) {
        res.status(400).json(e)
    }
})


module.exports = router