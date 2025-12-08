import  authModel  from "../models/authModel.js";

import supabase from "../services/supabaseClient.js";



const otpStore = {};
export const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const newUser = await authModel.register(supabase, { email, password, name });
        res.status(201).json({
            success: true,
            user: newUser
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await authModel.login(supabase, { email, password });
        res.json({
            success: true,
            message: "Login successful",
            doctor: doctor
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({  
            error: "Internal server error",
            details: error.message
        });
    }
};

//otp send /api/auth/send-otp
export const otpSend = async (req, res) => {
    try {
        const {phone} = req.body;

        const verifyPhone=await authModel.verifyPhone(supabase,phone);
        if(!verifyPhone){
            return res.status(401).json({error:"Phone number not registered,please regeister first"});
        }
         const otp = Math.floor(100000 + Math.random() * 900000);
         otpStore[phone]={
            otp:otp,
            expiresAt: Date.now() + 5 * 60 * 1000 
         }
         console.log(otpStore);
         res.json({
            success: true,
            message: "OTP sent successfully"
         });
         console.log("Demo OTP for", phone, ":", otp);
    }catch (error) {
        console.error("OTP Send error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
}

//otp verify
export const otpVerify = async (req, res) => {
    try {
        const {phone, otp} = req.body;
        const record = otpStore[phone];
        if(!record){
            return res.status(400).json({error:"No OTP sent to this phone number"});
        }
          

        if (Date.now() > record.expiresAt){
            delete otpStore[phone];
            console.log(otpStore)
            return res.status(400).json({ error: "OTP expired" });
        }

        if (parseInt(otp.trim()) !== record.otp){
            console.log(record.otp, otp);
            return res.status(400).json({ error: "Incorrect OTP" });
        }
        delete otpStore[phone];

            res.json({
            success: true,
            token: "mock-jwt-token-here"
            });
        } catch (error) {
        console.error("OTP Verify error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
}