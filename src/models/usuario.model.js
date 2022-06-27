const { Schema, model } = require('mongoose')
const bcryptjs = require('bcryptjs')
const schemaUser = new Schema(
    {
        telefono : {
            type : String
        },
        username : {
            type : String
        },
        password : {
            type : String
        }
    },
    {
        timestamps : {
            createdAt: true, updatedAt: true
        }
    }
)

schemaUser.methods.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    const hash = bcryptjs.hash(password, salt)
    return hash
}

schemaUser.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password)
}

module.exports = model('collectionUser', schemaUser)