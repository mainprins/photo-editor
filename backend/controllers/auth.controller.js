const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");


const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: "Required fields cannot be empty." })
        }
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ error : "User already exists." })
        }

        if(password.length < 7){
            return res.status(400).json({ error : "Password must be atleast 7 characters long." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword
        });

        const token = await jwt.sign({id:newUser._id,email:newUser.email},process.env.JWT_SECRET,{expiresIn: "1h"});

        res.cookie('token',token,{
            httpOnly:true,
            maxAge:3600000,
            secure: process.env.NODE_ENV == "production",
            sameSite:'strict',
        });

         await newUser.save();

        const userResponse = {
            id:newUser._id,
            email:newUser.email,
            fullname:newUser.fullname,
        }
        res.status(201).json({ message: "New user created successfully" ,authUser:userResponse})
    } catch(error) {
         console.error("Error in signup controller : ",error);
         res.status(500).json({error: "Internal Server Error."});
    }
}

const logout = (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully',authUser:null });
    } catch (error) {
        console.error("Error in logout controller : ",error);
        res.status(500).json({error: "Internal Server Error."});
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Required fields cannot be empty."})
        }
        const user = await userModel.findOne({email:email});
        if(!user){
            return res.status(400).json({error: "Either your email or password is incorrect."})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error: "Either your email or password is incorrect."})
        }

        const token = await jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('token',token,{
            secure: process.env.NODE_ENV == "production",
            httpOnly:true,
            maxAge:3600000,
            sameSite:'strict',
        });

        const userResponse = {
            id:user._id,
            email:user.email,
            fullname:user.fullname,
        }
        res.status(200).json({message:"Logged in successfully.",authUser:userResponse});

    } catch (error) {
        console.error("Error in Login controller : ",error);
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = { signup,logout,login }