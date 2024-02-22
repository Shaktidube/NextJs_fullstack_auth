import Link from "next/link";

export default function UserProfile({params}:any) {
    return (
        <div className="flex bg-black text-white flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Profile </h1>
            <br></br>
            <p className="text-4xl">Profile Page <span className="p-2 ml-1 rounded bg-orange-500 hover:bg-blue-100 text-black">{params.id}</span></p>
            <br></br>
            <Link href="/login" className="text-blue-500 hover:text-blue-100">Visit Login Page</Link>
            <br /><br />
            </div>
    );
}