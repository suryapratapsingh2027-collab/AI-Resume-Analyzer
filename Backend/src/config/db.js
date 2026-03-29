const mongoose = require('mongoose')

 connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to database')
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB