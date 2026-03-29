const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'token is required']
    }
},{
    timestamps: true
})

const blacklistTokenModel = mongoose.model('blacklistTokens', blacklistTokenSchema)

module.exports = blacklistTokenModel