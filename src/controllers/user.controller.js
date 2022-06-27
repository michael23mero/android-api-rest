const { UserModel } = require('../models')

const createUser = async (req, res) => {
    const { ...data } = req.body
    const existeUser = await UserModel.findOne({
        telefono : data.telefono
    })
    if(existeUser){
        return res.json({msg: `El numero de telefono: ${data.telefono} ya se encuentra registrado`})
    }
    const user = new UserModel(data);
    const userCreate = await user.save();
    res.status(200).json({msg: `El usuario fue creado satisfactoriamente`})
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

const authUser = async (req, res) => {
    const { username, password } = req.body
    const existeUser = await UserModel.findOne({
        username : username
    })
    if(!existeUser){
        return res.json({msg: 'Usuario no encontrado'})
    }else{
        res.status(200).send('Bienvenido')
    }
}

module.exports = { createUser, readUser, updateUser, deleteUser, readOneUser, authUser }