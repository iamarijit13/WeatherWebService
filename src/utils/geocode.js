
const request = require('request');

const geocode = (address, callback)=>{
    const pointUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaWFtYXJpaml0MTMiLCJhIjoiY2tuNHk3cDdpMTlucTJ1b3V2czRsNGhvYyJ9.tccv-oxZIwKgWsm2VF-6kA&limit=1';

    request({url: pointUrl, json: true},(error, {body}) =>{
        if(error){
            callback('\n\nUnable to connect to the Internet, check your network connection.\n', undefined);
        }else if(body.features.length === 0){
            callback('\n\nUnable to find the location. \n\n', undefined);
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;