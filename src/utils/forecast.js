const request = require('request')
//after es6 destructuring
const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/5b0fcae5214d34dae908940e20a4d583/' + latitude + ','+longitude
    request({url, json : true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location Services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find the Location. Try another!', undefined)
        } else {
           
            callback(undefined, response.body.daily.data[0].summary + ' The temperature for the day is expected as '+ response.body.currently.temperature + '. There is a ' + response.body.currently.precipProbability+ ' % Precipitation Probablility.' )
        }
    })
}

module.exports = forecast