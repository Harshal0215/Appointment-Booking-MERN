import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

const registerUser = async (req,res) =>{
    try {
        const {name, email, password} = req.body

        if(!name || !password || !email){
            return res.json({success:true,message:"missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"enter a valid email"})
        }
        if(password.length < 8 || password.length == 0){
            return res.json({success:false, message:"Enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name, 
            email,
            password:hashedPassword
        }

        const newUser = new userModel
        const user = await newUser.save()
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true, token})

    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}

const loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            res.json({success:false,message:"user does not exists"})
        }

        const isMatch=  await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid credentials'})
        }
    } catch (error) {
        res.json({success:false})
    }
}

const getProfile = async(req,res)=>{
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true, userData})

    } catch (error) {
        console.log(error);
        res.json({success:false})
        
    }
}

const updateProfile = async (req, res) => {
    try {
        const {userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || gender){
            return res.json({success:false, message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone, address:JSON.parse(address),dob,gender})

        if(imageFile){
            //upload img to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:'Profile Updated'})

    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
}

const bookAppointment = async () =>{
    try {
       const {userId, docId, slotDate, slotTime} = req.body 

       const docData = await doctorModel.findById(docId).select('-password')

       if(!docData.available){
        return res.json({success:false,message:"Doctor not available"})
       }
       let slots_booked = docData.slots_booked

       if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false,message:'Slots not available'})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
       }else{
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
       }
       
       const userData = await userModel.findById(userId).select('-password')

       delete docData.slots_booked

       const appointmentData = {
        userId, docId, userData, docData, amount: docData.fees,slotTime, slotDate, data: Date.now()
       }
       const newAppointment = new appointmentModel(appointmentData)
       await newAppointment.save()

       await doctorModel.findByIdAndUpdate(docId,{slots_booked})

       res.json({success:true, message:"Appointment Booked"})

    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
}

const listAppointment = async (req,res) => {
    try {
        const {userId} = req.body
        const appointmnets = await appointmentModel.find({userId})

        res.json({success:true, appointmnets})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const cancelAppointment = async (req,res)=>{
    try {
        const {userId, appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData.userId !== userId) {
            return res.json({success:false,message:"Unauthorized action"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Cancelled"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const razorPayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorPay = async(req,res) =>{
    const {appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.cancelled){
        return res.json({success:false,message:"appointment cancelled or not found"})
    }
    
}
export {registerUser,loginUser, getProfile , updateProfile, bookAppointment, cancelAppointment,listAppointment}