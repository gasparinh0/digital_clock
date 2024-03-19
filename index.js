//definindo dependencias do node e express
const express = require('express')
const path = require('path')
const fs = require('fs')

//colocando o express em uso
const app = express()

//definindo o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//definindo arquivos publicos e estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Relógio
let time = {
    hoursElement: '',
    minutesElement: '',
    secondsElement: '',
};

let dayObj = {
    dayElement: '',
    monthElement: '',
    yearElement: '',
}

const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function getMonthName(monthNumber) {
    return monthNames[monthNumber];
}

function newDay() {
    const date = new Date();

    const day = date.getDate();
    const month = getMonthName(date.getMonth()); 
    const year = date.getFullYear();

    dayObj.dayElement = day;
    dayObj.monthElement = month;
    dayObj.yearElement = year;
}

function newTime() {
    const date = new Date()

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    time.hoursElement = fixTime(hours)
    time.minutesElement = fixTime(minutes)
    time.secondsElement = fixTime(seconds)
}

function fixTime(time){
    return time < 10 ? '0'+time : time
}

newTime()
newDay()
setInterval(newTime, 1000)

//API de clima
const key = "d99c13f054c406019f175a3bfa7f8d70"

async function weatherInfo() {
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=São Paulo&appid=${key}`).then( response => response.json() );
    console.log(weatherData)
}

weatherInfo()


//ROTAS
app.get('/', (req, res) => {
    res.render('principal', {
        title: 'Digital Clock',
        hours: time.hoursElement,
        minutes: time.minutesElement,
        seconds: time.secondsElement,
        day: dayObj.dayElement,
        month: dayObj.monthElement,
        year: dayObj.yearElement,
    })
})

// error 404 (not found)
app.use((req, res) => { //middleware
    res.send('Page not found!')
})


//Inicializando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))