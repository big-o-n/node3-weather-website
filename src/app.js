const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //accessing the port for heroku

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and views location
app.set('view engine', 'hbs')//setting handle bars to make dynamic template
app.set('views', viewsPath)//customised path to the views(templates) folder

//setup atatic directory to serve
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)
//rendering dynamic content through handlebars
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Himangi Saxena'
    })//allows us to render one of the views of the hbs template
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Himangi Saxena'
    })//allows us to render one of the views of the hbs template
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'Happy to Help you!',
        name: 'Himangi Saxena'
    })//allows us to render one of the views of the hbs template
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a search address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title : '404',
        name : 'Himangi Saxena',
        errorMessage : 'Help Article Not Found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title : '404',
        name : 'Himangi Saxena',
        errorMessage : 'Page Not Found'
    })
})
//app.com(root route)
//app.com/help
//pp.com/about

//starting server

// app.listen(3000, ()=>{
//     console.log('Server is up in port 3000')
// })
app.listen(port, ()=>{
    console.log('Server is up in port' + port) 
})
