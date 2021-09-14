import mongoose from "mongoose";
require('dotenv').config( { path: '.env' } )

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO)
        console.log('DB Conected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB