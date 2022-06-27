const { Schema, model } = require('mongoose')
const schemaUser = new Schema(
    {
        telefono : {
            type : String
        },
        firstname : {
            type : String
        },
        lastname : {
            type : String
        },
        useremail : {
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

module.exports = model('collectionUser', schemaUser)