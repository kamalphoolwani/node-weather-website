const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//index.hbs
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Karan'
    })
})

//about.hbs
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Karan'
    })
})

//help.hbs
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Karan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
         return res.send({
            error:'You must provide an address!'
        })
    }

    city = req.query.address
    geocode(city,(error,{ latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({ error })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })


})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Help article not found',
        name:'Karan'
    })
})

//404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Page not found',
        name:'Karan'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})