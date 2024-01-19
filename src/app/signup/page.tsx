"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        name: ""
    });
    const [isDisabled, setIsDisabled] = React.useState(true);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.name.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [user]);

    const [Loading, setLoading] = React.useState(false);

    const onSignUp = async () => {
        try {
            setLoading(true)
            console.log("signup user",user)
            const res = await axios.post("/api/users/signup", user);
            console.log(res.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="p-2 text-3xl rounded text-black bg-blue-400">Signup</h1>
            <hr />
            <label htmlFor="username" className="font-bold">username</label>
            <input
                className="p-2 text-black border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="username"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="username"
            />

            <label htmlFor="email" className="font-bold">email</label>
            <input
                className="p-2 text-black border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="email"
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label htmlFor="password" className="font-bold">password</label>
            <input
                className="p-2 text-black border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="password"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
                className="p-2 border border-grey-300  rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                onClick={onSignUp}
            >
                {(!Loading) ? ((isDisabled) ? "No Signup" : "Signup") : (<Loader2 className="w-4 h-4 mr-2 animate-spin" />)}
            </button>

            <Link href="/login">Already have an account ?</Link>
        </div>
    );
}