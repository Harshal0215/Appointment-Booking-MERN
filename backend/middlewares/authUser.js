import jwt from 'jsonwebtoken'

const authUser = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({message:"Not authorized, login again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({message:"Not authorized, login again"})
        }

        req.body.userId = token_decode.id

        next()
    } catch (error) {
        console.log(error);
        res.json({message:error.message})
        
    }
}

export default authUser