import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"please provide a username"],
            unique:[true,"username already exists"],
        },
        email:{
            type:String,
            required:[true,"please provide a email"],
            unique:[true,"email already exists"],
        },
        password:{
            type:String,
            required:[true,"please provide a password"],
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        forgotPasswordToken:String,
        forgotPasswordTokenExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date,
    },{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User; 