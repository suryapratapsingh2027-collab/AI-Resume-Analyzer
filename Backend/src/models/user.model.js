const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, 'username already exist'],
        required: true
    },
    email: {
        type: String,
        unique: [true, 'email already exist'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel