import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SendEmail } from "@/helpers/mailer";




connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);

        //check if user is already exist
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({message: "User already exist"}, {status: 400})
        }

        //hash password
        const hashedPassword = await bcryptjs.hash(password, 12)

        //create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await SendEmail({email,emailType:"VERIFY",userId:savedUser._id});

        return NextResponse.json({message: "User created successfully",success:true,savedUser} )
        
    } catch (error:any) {
        return NextResponse.json({ message: error.message},{status: 500})
    }
}