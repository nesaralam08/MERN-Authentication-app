const usermodel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signupController = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const user = await usermodel.findOne({email})
        if(user){
            return res.status(409)
            .json({
                message:"user is already exist, you can login",success:false
            })
        }
        const hashpass = await bcrypt.hash(password,10);
        const newuser = new usermodel({
            name,
            email,
            password:hashpass
        })
        await newuser.save();
        res.status(201).json({message:"Signup Successfully !",success:true})
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}
const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(409)
            .json({
                message:"user not register, you can signup",success:false
            })
        }
        const decode = await bcrypt.compare(password,user.password);
        if(!decode){
            return res.status(403)
                .json({message:"invalid password or email",success:false})
        }
        const token = jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:"24h"})
        res.status(200).json({message:"Login Successfully",success:true,token,email,name:user.name})
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}
module.exports = {
    signupController,
    loginController
}