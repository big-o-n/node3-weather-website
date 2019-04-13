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
           //console.log(response.body.daily.data[0])
            callback(undefined, response.body.daily.data[0].summary + ' The average temperature for the day is '+ response.body.currently.temperature + 'F. There is a ' + response.body.currently.precipProbability*100 + '% precipitation probablility.' + ' Maximum temperature for the day will be ' + response.body.daily.data[0].temperatureHigh + 'F and minimum temperature will be ' + response.body.daily.data[0].temperatureLow + 'F. Have a nice day!')
        }
    })
}

module.exports = forecast