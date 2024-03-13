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

//ROTAS
app.get('/', (req, res) => {
    res.render('principal', {
        title: 'Digital Clock'
    })
})

// error 404 (not found)
app.use((req, res) => { //middleware
    res.send('Page not found!')
})


//Inicializando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))