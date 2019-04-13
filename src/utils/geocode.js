const request = require('request')

//afetr es66 destructuring
const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJjZGVmZ2hpaiIsImEiOiJjanU3MGE2am8wY3p5NGRvaHJneHlsNWxhIn0.nOLQnQEM_FlfpD8vRpilIw&limit=1'
    request({url : url, json : true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location Services!', undefined)
        } else if(body.features.length===0){
            callback('Unable to find the Location. Try another!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode