"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();

    const [Loading, isLoading] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [user]);


    const onLogin = async () => {
        const res = await axios.post("/api/users/login", user);
        console.log(res);
        router.push(`/profile`);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="p-2 text-3xl rounded text-black bg-blue-400">Login</h1>
            <hr />
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 text-black border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="email"
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label htmlFor="password">password</label>
            <input
                className="p-2 text-black border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                id="password"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
                className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
                onClick={onLogin}
            >
                Login here
            </button>

            <Link href="/signup">Not have an account ?</Link>
        </div>
    );
}