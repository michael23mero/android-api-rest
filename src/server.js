const express = require('express')
const cors = require('cors')


class Servidor{
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        require('./config/dbc').dbc()

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
    }

    routes(){
        this.app.use('/api/v1/user', require('./routes/user.routes'))

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor a su servicio en el puerto ${this.port}`)
        })
    }
}

module.exports = Servidor;