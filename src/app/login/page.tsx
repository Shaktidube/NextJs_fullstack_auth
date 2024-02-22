"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  Axios  from "axios";
import toast from "react-hot-toast";

export default function LoginPage () {
    const router = useRouter(); 
    const [user,setUSer] = React.useState({
        email:"",
        password:""
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () =>{
        try {
            setLoading(true);
            const response = await Axios.post("/api/users/login",user)
            console.log(response.data);
            toast.success("you login Successfully", response.data);
            router.push("/profile")
        } catch (error:any) {
            console.log("login failed",error.message);
            toast.error("Login failed");
            
        } finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }   
    } ,[user])
    return(
        <div className="flex bg-black text-white flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "proccessing...." : "Login"}</h1>
            <hr></hr>
            <hr></hr>

            
            <label htmlFor="email">Email</label>
            <input className="p-3 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="email" id="email" placeholder="email" value={user.email} onChange={(e)=>setUSer({...user,email:e.target.value})}></input>
            <label htmlFor="password">Password</label>
            <input className="p-3 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" placeholder="password" value={user.password} onChange={(e)=>setUSer({...user,password:e.target.value})}></input>

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:border-gray-950">{buttonDisabled? "No Signup":"Login"}</button>
            <hr></hr>
            <hr></hr>
            <Link href="/signup" className="text-blue-500 hover:text-blue-100">Visit Signup Page</Link>
        </div>
    );
}