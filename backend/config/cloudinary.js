import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async()=>{
    cloudinary.config({
        cloud_name:process.env.COULDINARY_NAME,
        api_key:process.env.COULDINARY_API_KEY,
        api_secret:process.env.COULDINARY_SECRET_KEY
})}

export default connectCloudinary;