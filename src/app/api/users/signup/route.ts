import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function POST(req: any) {
    const body = await req.json();
    try {

        const checkEmailResult = await prisma.teachers.findUnique({
            where: {
                email: body.email
            }
        });

        if (checkEmailResult !== null) {
            return NextResponse.json({
                status: false,
                message: "Email is already registered. Please use a different email.",
            });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(body.password, salt)

        const insertResult = await prisma.teachers.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        });

        return NextResponse.json({
            status: true,
            message: "Signup Successfull",
            insertResult
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ status: false, message: err.message });
    }
}