"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useReducer } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success("Logged-out successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-4xl">Profile </h1>
            <hr />
            <br />
            <button
                onClick={logout}
                className="bg-blue-400 hover:bg-white text-black py-2 px-4 rounded font-bold"
            >
                Logout
            </button>
        </div>
    );
}