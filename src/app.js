const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths to express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

//setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Home',
        name: 'Mahmoud Badr'
    })
})

app.get('/about', (req, res) => {
    // let date = new Date();
    // //let dateInString = " "+date.getFullYear+" "+date.getMonth+" "+date.getDay
    // let date1 = date.getFullYear + " : " + date.getMonth
    res.render('about', {
        title: 'About',
        name: 'Mahmoud Badr',
        date: "2020-10-1"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mahmoud Badr',
        message: 'We are here to help you please be honest and tell us all your feedback ^_^'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    let forecastOut
    geoCode(req.query.location, (error, {longitude,latitude,placeName}={}) => {
        if (error) {
            forecastOut = { error, message: 'try again!' }
            return res.send(forecastOut)
        }
        else {
            forecast(longitude, latitude, (error, response) => {
                if (error) {
                    forecastOut = { error, message: 'try again!' }
                } else {
                    forecastOut = {
                        location: req.query.location,placeName,
                        forecast: response
                    }
                }
                //console.log(forecastOut)
                res.send(forecastOut)
            })
        }
    })

    // res.send({
    //     location: req.query.location,
    //     temprature: ""
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })

    console.log(req.query)

})

app.get('/help/*', (req, res) => {
    res.render('general404', {
        title: '404',
        errorMessage: 'Help article not found!!',
        name: 'Mahmoud Badr'
    })
})

app.get('*', (req, res) => {
    res.render('general404', {
        title: '404',
        errorMessage: 'Page not found!!',
        name: 'Mahmoud Badr'
    })
})

app.listen(3000, () => {
    console.log('server is up in port 3000')
})


// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Help page'
//         , age: 1
//     },
//     {
//         name:'bango'
//         ,age:22
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>About page</h2>')
// })