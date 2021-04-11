const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const messageThree = document.querySelector('#message3');
const messageFour = document.querySelector('#message4');
const messageFive = document.querySelector('#message5');
const messageSix = document.querySelector('#message6');
const messageSeven = document.querySelector('#message7');
const messageEight = document.querySelector('#message8');
const messageNine = document.querySelector('#message9');
const messageTen = document.querySelector('#message10');
const messageEleven = document.querySelector('#message11');
const messageTwelve = document.querySelector('#message12');
const messageThirteen = document.querySelector('#message13');

// messageOne.textContent = "Hello there.";

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    messageFive.textContent = '';
    messageSix.textContent = '';
    messageSeven.textContent = '';
    messageEight.textContent = ''
    messageNine.textContent = '';
    messageTen.textContent = '';
    messageEleven.textContent = '';
    messageTwelve.textContent = '';
    messageThirteen.textContent = '';


    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(!location){
            messageOne.textContent = 'Provide a valid Location.';
        }else if(data.error){
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = '';
            messageTwo.textContent = 'Location : ' + data.location;
            messageThree.textContent = 'Latitude : ' + data.latitude;
            messageFour.textContent = 'Longitude : ' + data.longitude;
            messageFive.textContent = (data.day === 'yes')? '\nDay / Night : Day' : '\nDay / Night : Night';
            messageSix.textContent = 'Date and Time : ' + data.time;
            messageSeven.textContent = 'Temparature : ' + data.currentTemparature+' degree celcious.';
            messageEight.textContent = 'Feels Like : ' + data.feelsLike+' degree celcious.';
            messageNine.textContent = 'Description : ' + data.description;
            messageTen.textContent = 'Wind Speed : ' + data.windSpeed + ' km/h.';
            messageEleven.textContent = 'Humidity : ' + data.humidity + ' %';
            messageTwelve.textContent = 'Visibility : ' + data.visibility;
            messageThirteen.textContent = 'Wind Pressure : ' + data.pressure;
        }
    })
})

})


// console.log("\n\nLocation : "+location);
// console.log("\nLatitude : "+latitude+", Longitude : "+longitude);
// console.log((day === "yes")? "\nDay / Night : Day" : "\nDay / Night : Night"); 
// console.log("\nDate and Time : "+time);
// console.log("\nTemparature : "+currentTemparature+" degree celcious.");
// console.log("\nFeels Like : "+feelsLike+" degree celcious.");
// console.log("\nDescription : "+description);
// console.log("\nWind Speed : "+windSpeed+" km/h.");
// console.log("\nHumidity : "+humidity+" %");
// console.log("\nVisibility : "+visibility);
// console.log("\nWind Pressure : "+pressure);
// console.log("\n\n");