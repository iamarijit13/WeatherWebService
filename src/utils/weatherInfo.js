request = require('request');


const weather =({longitude, latitude}, callback)=>{
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=a6b73fcb921e116521d6f01463b9ed0e&query=' + latitude +',' + longitude + '&units=m';

    request({url: weatherUrl, json: true}, (error, {body})=>{
        if(error){
            callback('\n\nUnable to connect to the Internet, check your network connection.\n', undefined);
        }else if(body.error){
            callback('\n\nUnable to find the location. Try another search. \n\n', undefined);
        }
        else{
            callback(undefined,{
                currentTemparature: body.current.temperature,
                feelsLike: body.current.feelslike,
                currentLocation: body.location.name,
                description: body.current.weather_descriptions[0],
                windSpeed: body.current.wind_speed,
                pressure: body.current.pressure,
                humidity: body.current.humidity,
                visibility: body.current.visibility,
                day: body.current.is_day,
                time: body.location.localtime,
                country: body.location.country,
                region: body.location.region
            })
        }
    })

}

module.exports = weather;