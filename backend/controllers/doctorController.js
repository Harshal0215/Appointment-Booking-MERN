import doctorModel from "../models/doctorModel.js";

const changeAvailability = async(req, res) =>{
    try {
        const {docId} = req.body        
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true, message:"Availability changed"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const doctorList = async (req,res)=>{
    try {
        const doctor = await doctorModel.find({}).select(['-password','-email'])
    } catch (error) {
        res.json({success:true, message:error.message})
    }
}
export {changeAvailability, doctorList}