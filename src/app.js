 const path = require('path');
 const express = require('express');
 const hbs = require('hbs');
 const kill = require('kill-port');
 geocode = require('./utils/geocode.js');
 weather = require('./utils/weatherInfo.js');

//  console.log(__filename);
//  console.log(path.join(__dirname,'../public'));

 const app = express();
 const port = process.env.PORT || 3000


 //Define paths for express configaration.
 const publicDirectoryPath = path.join(__dirname,'../public');
 const viewPath = path.join(__dirname,'../templates/views');
 const partialsPath = path.join(__dirname, '../templates/partials')

 //Set up Handlebar engine and set locations.
 app.set('view engine', 'hbs')
 app.set('views', viewPath);
 hbs.registerPartials(partialsPath);

 //Set up static Directory to server.
 app.use(express.static(publicDirectoryPath));


 app.get('',(req,res)=>{
    res.render('index', {
        title: "Weather Application",
        name: "created by - Arijit."
    });
 })

 app.get('/about',(req, res)=>{
    res.render('about', {
         title: 'About Me',
         name: "created by - Arijit."
     });
 })

 app.get('/help',(req, res)=>{
     res.render('help', {
         title: "Handlebars.",
         name: 'created by - Arijit.'
     })
 })

 app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide an Address."
        })
    }
    geocode(address = req.query.address, (error, {longitude, latitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        const address ={
            longitude,
            latitude
        }
        weather(address,(error, {day, time, currentTemparature, feelsLike, description, windSpeed, humidity, visibility, pressure}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                latitude,
                longitude,
                day,
                time,
                currentTemparature,
                feelsLike,
                description,
                windSpeed,
                humidity,
                visibility,
                pressure
            })
                
        })
    })

    // res.send({
    //     forecast: "It is dummy",
    //     location: "Kolkata",
    //     address: req.query.address
    // })

    /*

                console.log("\n\nLocation : "+location);
                console.log("\nLatitude : "+latitude+", Longitude : "+longitude);
                console.log((day === "yes")? "\nDay / Night : Day" : "\nDay / Night : Night"); 
                console.log("\nDate and Time : "+time);
                console.log("\nTemparature : "+currentTemparature+" degree celcious.");
                console.log("\nFeels Like : "+feelsLike+" degree celcious.");
                console.log("\nDescription : "+description);
                console.log("\nWind Speed : "+windSpeed+" km/h.");
                console.log("\nHumidity : "+humidity+" %");
                console.log("\nVisibility : "+visibility);
                console.log("\nWind Pressure : "+pressure);
                console.log("\n\n");

    */
 })

 app.get('/product', (req,res)=>{
     (!req.query.location)
     {
         res.send("Must enter a Location.")
         return;
     }
     res.send({
         product: []
     })
 })

 app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: "404 Page",
        name: "Arijit",
        errorMessage: "Help Artical not found."
    })
})

 app.get('*', (req, res)=>{
     res.render('404', {
         title: "404 Page.",
         name: "Arijit.",
         errorMessage: "Page not Found."
     })
 })


 app.listen(port, ()=>{
     console.log('Server is up on port: '+port+'.')
 })

 //lsof -i tcp:3000
 //kill -9 98898