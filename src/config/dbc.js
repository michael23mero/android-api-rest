const mongoose = require('mongoose')

module.exports.dbc = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion exitosa con la base de datos')
    }catch(err){
        console.error(err)
        throw new Error('Error de conexion con la base de datos')
    }
}