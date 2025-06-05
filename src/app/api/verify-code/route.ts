/* eslint-disable @typescript-eslint/no-explicit-any */

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request: Request){
    await dbConnect();

    try{
      
        const body = await request.json();
        const usernameSchema = z.object({
            username: usernameValidation,
            code: z.string().min(1, "verification code is required")
        })
        const result = usernameSchema.safeParse(body);
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            const codeErrors = result.error.format().code?._errors || [];
            return Response.json({
                success: false,
                message: [...usernameErrors, ...codeErrors].join(', ') || "Invalid request body"
            }, {status:400})
        }
       const {username, code} = result.data;
       
       const decodedUsername = decodeURIComponent(username);
       const user = await UserModel.findOne({username: decodedUsername})
      
       if(!user){
        return Response.json(
            {
                success: false,
                message : "User not found"
            },
            {status: 500}
        )
       }
  
       const isCodeValid = user.verifyCode === code;
       const isCodeNotExpires = new Date(user.verifyCodeExpiry) > new Date();

       if(isCodeValid && isCodeNotExpires){
       user.isVerified = true;
        await user.save();

        return Response.json({
            success: true,
            message: "Account verified successfully",
        },
        {status: 200}
    ) }
    else if(!isCodeNotExpires){
        return Response.json({
            success: false,
            message: "Verification code has expired. Please signup again to receive a new code.",
        }, {status: 400});
    }else{
        return Response.json({
            success: false,
            message: "Invalid verification code. Please try again.",
        }, {status: 400});
    }
        
    }catch(error: any){
        console.error("Error verifying user:", error);
        return Response.json({
            success: false,
            message: "Error verifying user"
        }, {status: 500});
    }
}