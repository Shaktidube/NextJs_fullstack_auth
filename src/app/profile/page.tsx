"use client";
// import Axios from "axios";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    const updatePassword = async () => {
        try {
            await axios.post('/api/users/updatepassword')
            toast.success('Update password successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        
            const res = await axios.get('/api/users/me')
            console.log(res.data.data);  
            setData(res.data.data._id);
            // setData(res.data.data.email);
            toast.success('Get data successful')
        
    }

    return (
        <div className="flex bg-black flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-white py-2 px-4">Profile</h1>
            <hr />
            <p className="text-blue-400">Profile page</p>
            <h2 className="py-2 px-4 mt-4 rounded text-white hover:text-blue-500 border border-gray-400 hover:border-pink-500 bg-black-500">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}><span className="text-pink-400">UserId</span>: {data}
            </Link>}</h2>
            <hr />
            {/* <Link href="/updatepassword" className="text-red-500 mt-4 hover:text-blue-100"></Link> */}
            <button onClick={updatePassword} className="text-red-400 mt-4   hover:text-white">Forgot Password</button>

            <button
                onClick={logout}
                className="  border border-gray-400 bg-blue-500 mt-4 hover:bg-black text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
                onClick={getUserDetails}
                className=" border border-gray-400 bg-purple-900 mt-4 hover:bg-black text-white font-bold py-2 px-4 rounded"
            >Get User Details</button>


        </div>
    )
}