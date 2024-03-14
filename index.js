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
    secondsElement: ''
};

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
setInterval(newTime, 1000)

//ROTAS
app.get('/', (req, res) => {
    res.render('principal', {
        title: 'Digital Clock',
        hours: time.hoursElement,
        minutes: time.minutesElement,
        seconds: time.secondsElement,
    })
})

// error 404 (not found)
app.use((req, res) => { //middleware
    res.send('Page not found!')
})


//Inicializando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))