import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await prisma.teachers.findUnique({
            where: {
                email: email
            }
        });

        if (password === null || user === null || user.password === null) {
            console.error("Invalid request or user object");
            return NextResponse.json({ error: "Invalid Request", status: 400 });
        }

        const validpass = await bcryptjs.compare(password, user.password);
        if (!validpass) {
            console.error("Password comparison failed");
            return NextResponse.json({ error: "Invalid Password", status: 400 });
        }

        console.log("user logged-in")

        // create token data
        const tokenData = {
            id: user.id,
        }

        // create token 
        const token = await jwt.sign(tokenData, process.env.token_secret!, { expiresIn: "1d" });
        
        const res = NextResponse.json({
            message: "Login Successfull",
            success: true,
            user
        });

        res.cookies.set("token", token, { httpOnly: true });
        return res;
    } catch (error: any) {
        console.error("Token Generation Error:", error);
        return NextResponse.json({ error: error.message });
    }
}
