import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

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

export {registerUser,loginUser}