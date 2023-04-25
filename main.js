const express = require('express');
const path = require('path');
const app = express();
const https = require('https');

const d = new Date();
const dd = JSON.stringify(d);
var ddd=dd.substring(1,11);

const hour = d.getHours();
const mints = d.getMinutes();

if(hour>12){
    var sel = "PM";
}
else if(hour<24){
    var sel="AM";
}
const time=`${hour}:${mints} ${sel}`

var year=ddd.substring(0,4);
var month = ddd.substring(5,7);
var date=ddd.substring(8,11);

if(month==01){
    month="Jan";
}if(month==02){
    month="Feb";
}if(month==04){
    month="March";
}if(month==04){
    month="April";
}if(month==05){
    month="May";
}if(month==06){
    month="June";
}if(month==07){
    month="July";
}
if(month==08){
    month="Aug";
}if(month==09){
    month="Sep";
}if(month==10){
    month="Oct";
}if(month==11){
    month="Nov";
}if(month==12){
    month="Dec";
}

const todayDate=`${date}-${month}-${year}`;

// for(i in monthS){
// }

const cur_file = path.dirname(__dirname);
const file = path.dirname(__filename);

// app.use(express.static(path.resolve(file+"/public")));
app.use(express.static("public"));

app.use(express.static("public/images"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render(path.resolve(file + "/views/front.ejs"));
});

app.post('/next', (req, res) => {


    var city1 = req.body.cityName;
    var city2 = req.body.cityNameP2;

    if (city1) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=2a66cf57d88779757906fe6d201b4dea&units=metric`;
        https.get(url, (response) => {
            response.on('data', (data) => {
                let weatherData = JSON.parse(data);
                // console.log(weatherData.main);
                


                var description = weatherData.weather[0].description;
                var wIcon = weatherData.weather[0].icon;
                var wIconImg = "http://openweathermap.org/img/w/"+wIcon+".png";
                var countryCode = weatherData.sys.country;
                var temp = Math.round(weatherData.main.temp);
                var tempF= Math.round((temp * 9/5) + 32);
                var tFeels = weatherData.main.feels_like;

                var tempMin = weatherData.main.temp_min;
                var tempMax = weatherData.main.temp_max;
                var pressure = weatherData.main.pressure;
                var humidity = weatherData.main.humidity;  
                var windS = weatherData.wind.speed;  
                var windDeg = weatherData.wind.deg;


                res.render(path.resolve(file + "/views/nextP.ejs"), {ddate:todayDate,time:time, countryCode:countryCode,
                location: city1, clouds:description, src:wIconImg, temp:temp,tFeels:tFeels, tempF:tempF,
                tempMinimum:tempMin,tempMaximum:tempMax, pressure:pressure, humidity:humidity,windSpeed:windS,windDegree:windDeg});
            })
        })
    }

    if (city2) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=2a66cf57d88779757906fe6d201b4dea&units=metric`;
        https.get(url, (response) => {
            response.on('data', (data) => {
                let weatherData = JSON.parse(data);
                
                var description = weatherData.weather[0].description;
                var wIcon = weatherData.weather[0].icon;
                var wIconImg = "http://openweathermap.org/img/w/"+wIcon+".png";
                var countryCode = weatherData.sys.country;
                var temp = Math.round(weatherData.main.temp);
                var tempF= Math.round((temp * 9/5) + 32);
                var tFeels = weatherData.main.feels_like;

                var tempMin = weatherData.main.temp_min;
                var tempMax = weatherData.main.temp_max;
                
                var pressure = weatherData.main.pressure;
                var humidity = weatherData.main.humidity;  
                var windS = weatherData.wind.speed;
                var windInKM=Math.round((windS*3600)/1000);
                var windDeg = weatherData.wind.deg;
 
                res.render(path.resolve(file + "/views/nextP.ejs"), {ddate:todayDate,time:time, countryCode:countryCode,
                location: city2, clouds:description, src:wIconImg, temp:temp,tFeels:tFeels, tempF:tempF,
                tempMinimum:tempMin, tempMaximum:tempMax, pressure:pressure, humidity:humidity,windSpeed:windInKM,windDegree:windDeg});

            })
        })
    }
});

app.listen(8000, () => {
    console.log('http://localhost:8000');
})