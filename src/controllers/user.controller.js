const { UserModel } = require('../models')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { ...data } = req.body
    const { password } = req.body
    const existeUser = await UserModel.findOne({
        telefono : data.telefono
    })
    if(existeUser){
        return res.json({msg: `El numero de telefono: ${data.telefono} ya se encuentra registrado`})
    }
    const user = new UserModel(data);
    user.password = await user.encryptPassword(password)
    const userCreate = await user.save();
    res.status(200).json({msg: `El usuario fue creado satisfactoriamente`})
}

const login = async (req, res) => {
    const { username, password } = req.body
    const existeUser = await UserModel.findOne({
        username : username
    })
    if(!existeUser){
        return res.status(400).json({msg: 'Usuario no encontrado'})
    }else{
        const comparacion = await existeUser.comparePassword(password)
        if(!comparacion){
            return res.status(400).json({msg: 'Contraseña incorrecta'})
        }else{
            return res.status(200).json({msg: 'Bienvenid@'})
        }
    }
}

const isAuthenticated = async (req, res, next) => {
    if(!req.cookies.jwt){
        return res.json({msg: 'Inicio de sesion exitoso'})
    }
    try{
        const decode = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
        req.user = decode
        next()
    }catch(error){
        res.status(400).json({error: 'token no es válido'})
    }
}



const readUser = async (req, res) => {
    const data = await UserModel.find()
    res.status(200).json(data)
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { ...data } = req.body;
    const userUpdate = await UserModel.findByIdAndUpdate(id, data, {new: true})
    res.status(200).json({msg: `El usuario fue actualizado satisfactoriamente`})
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userDelete = await UserModel.findByIdAndRemove(id)
    res.status(200).json({msg: `El usuario fue eliminado satisfactoriamente`})
}

const readOneUser = async (req, res) =>{
    const { username } = req.params
    const data = await UserModel.findOne(username)
    if(data){
        res.status(200).send(data)
    }else{
        res.json({msg: `Usuario no encontrado`})
    }  
}

module.exports = { register, login, readUser, updateUser, deleteUser, readOneUser, isAuthenticated }