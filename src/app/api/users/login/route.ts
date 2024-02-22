import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";





connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password } = reqBody;
        console.log(reqBody);

        //checck if user is exist or not
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message: "User not exist"}, {status: 400})
        }
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({message: "Invalid password"}, {status: 400})
        }
        //create token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRETE!, {expiresIn: "1d"})

        const response = NextResponse.json({message: "Login successfully",success:true})
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
        
    } catch (error:any) {
        return NextResponse.json({ message: error.message},{status: 500})
    }
}