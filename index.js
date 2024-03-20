//definindo dependencias do node e express
const dot = require('dotenv').config()
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

//Relógio - datas
let dayObj = {
    dayElement: '',
    monthElement: '',
    yearElement: '',
}

//Array de nomes de meses para melhorar a visualização da informação que é passada pela rota
const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

//Colocando os nomes em uma função
function getMonthName(monthNumber) {
    return monthNames[monthNumber];
}

//Função para receber os dia, mês e ano
function newDay() {
    const date = new Date();

    const day = date.getDate();
    const month = getMonthName(date.getMonth()); 
    const year = date.getFullYear();

    dayObj.dayElement = day;
    dayObj.monthElement = month;
    dayObj.yearElement = year;
}

newDay()

//API de clima
const key = process.env.APIWEATHER

//Definindo variáveis que vão receber as informações
let weather = {
    nameElement: '',
    tempElement: '',
    descriptionElement: '',
    imgElement: '',
};

//Função para receber os dados do weather API
async function weatherInfo() {
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=São Paulo&appid=${key}&lang=pt_br&units=metric`).then(response => response.json());
    
    weather.nameElement = weatherData.name;
    weather.tempElement = Math.floor(weatherData.main.temp) + '°C';
    weather.descriptionElement = weatherData.weather[0].description;
    weather.imgElement = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
}

weatherInfo();

//ROTAS
app.get('/', (req, res) => {
    res.render('principal', {
        title: 'Digital Clock',
        //dia, mês e ano
        day: dayObj.dayElement,
        month: dayObj.monthElement,
        year: dayObj.yearElement,
        //informações do tempo
        city: weather.nameElement,
        temp: weather.tempElement,
        description: weather.descriptionElement,
        img: weather.imgElement,
    })
})

// error 404 (not found)
app.use((req, res) => { //middleware
    res.send('Page not found!')
})


//Inicializando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))