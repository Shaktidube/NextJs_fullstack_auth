"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast from 'react-hot-toast';


export default function SignupPage () {
    const router = useRouter();
    const [user,setUSer] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false)

    const [loading, setLoading] = React.useState(false);

    const onSignup = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            toast.success("you signup Successfully", response.data);
            router.push("/login")
            
        } catch (error: any) {
            console.log("signup failed",error.message);
            
            toast.error("Signup failed")
        } finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password && user.username.length >0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }   
    } ,[user])
    return(
        <div className="flex bg-black text-white flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "proccessing...." : "Signup"}</h1>
            <hr></hr>
            <hr></hr>

            <label htmlFor="username">username</label>
            <input className="p-3 text-black border border-solid border-gray-300 hover:border-cyan-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="username" placeholder="Username" value={user.username} onChange={(e)=>setUSer({...user,username:e.target.value})}></input>
            <label htmlFor="email">email</label>
            <input className="p-3 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="email" id="email" placeholder="email" value={user.email} onChange={(e)=>setUSer({...user,email:e.target.value})}></input>
            <label htmlFor="password">password</label>
            <input className="p-3 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" placeholder="password" value={user.password} onChange={(e)=>setUSer({...user,password:e.target.value})}></input>
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:border-blue-400">{buttonDisabled? "No Signup":"Signup"}</button>
            <hr></hr>
            <hr></hr>
            <Link href="/login" className="text-blue-500 hover:text-blue-100">Visit Login Page</Link>
        </div>
    );
}