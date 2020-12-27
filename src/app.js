const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const port = process.env.PORT || 3000
const app = express();

//Variable for setting path config.
const publicAssetPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

//setting up configuration for hbs and views path
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partials)

//loading static content in application
app.use(express.static(publicAssetPath))

const publicHelpPath = path.join(publicAssetPath, 'help.html')
//app.use('/help', express.static(publicHelpPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Keyurs Colour',
        name: 'AP emulsion'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help Me',
        name: 'I need Aadhar Card'
    })

})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please enter address'
        })
    }
    console.log(req.query.address)

    geocode(req.query.address, (error, { lat, long, place } = {}) => {
        if (error) {
            return res.send({
                error: 'Error in Geocode request'
            })
        }
        forecast(lat, long, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error: 'Error in ForeCast request'
                })
            }
            res.send({
                address: req.query.address,
                place: place,
                foreCast: foreCastData
            })


        })

    })
    // res.render('weather',{
    //     title: 'Todays Weather is Hot',
    //     name: 'Check the thermometer'
    // })
})

app.get('/help/*', (req, res) => {

    res.render('notfound', {
        message: 'help article not found',
        title: 'Help Sub pages',
        name: 'Moghembo'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        message: 'Page Not Found',
        title: 'No Page Available',
        name: 'Shakal'

    })

})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})