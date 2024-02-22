"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  Axios  from "axios";
import toast from "react-hot-toast";

export default function updatePassword(){
    const router = useRouter(); 

    const [buttonDisabled,setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onUpdatePassword = async () =>{
        try {
            setLoading(true);
            const response = await Axios.post("/api/users/updatepassword")
            console.log(response.data);
            toast.success("you Update Successfully", response.data);
            router.push("/profile")
        } catch (error:any) {
            console.log("update failed",error.message);
            toast.error("update failed");
            
        } finally{
            setLoading(false);
        }

    }
    return(
        <div className="flex bg-black flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-white">Update Password</h1>
            <label htmlFor="password" className="text-white mb-3 mt-3">password</label>
            <input className="p-3 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" placeholder="Update password"  ></input>
            <label htmlFor="password" className="text-white mb-3 mt-3">Confirm password</label>
            <input className="p-3 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="confirmpassword" id="confirmpassword" placeholder="Confirm password"  ></input>
            <button onClick={onUpdatePassword} className="p-2 border text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:border-blue-400">{buttonDisabled? "No Update":"Update"}</button>

        </div>
    )
}