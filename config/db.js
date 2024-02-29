const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn  = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Db connected successfully ${conn.connection.host}`.bgBlue.white)
    } catch (error) {
        console.log(`Error in MongoDb ${error}`.bgRed.white)
    }
}

module.exports  = {connectDB}