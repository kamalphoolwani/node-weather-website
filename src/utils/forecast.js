const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0887165f76ca356c9620b7cc0d4587e7&query=' + latitude + ',' + longitude
    request({url, json:true}, (error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to search location!',undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0]+ ". It is currently "+ body.current.temperature +" degrees out. It feels like "+ body.current.feelslike +" degrees out. Humidity is " + body.current.humidity+"% .")
        }

    })
}

module.exports = forecast