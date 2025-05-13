import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const connectDB = async()=>{
   try {mongoose.connection.on('connected',()=>console.log('Database connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)}
    catch(error){
        console.log(mongoose.Error);
        
    }
}

export default connectDB