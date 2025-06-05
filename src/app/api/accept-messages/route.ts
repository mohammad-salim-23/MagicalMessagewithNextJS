import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import {User} from "next-auth";

export async function POST(request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, {status: 401});
    }

    const userId  = user.id;
    const {acceptMessages} = await request.json();

    try{
      const updateUser = await UserModel.findByIdAndUpdate(
        userId,
        {isAccepttingMessage: acceptMessages},
        {new: true , runValidators: true}
      )
   if(!updateUser){
        return Response.json({
            success: false,
            message: "User not found"
        }, {status: 404});
    }

    return Response.json({
        success: true,
        message: `User status updated to ${acceptMessages ? "accept messages" : "not accept messages"}`,
        data: updateUser
    })
}
     
    
    catch(error){
        console.log("failed to update user status to accept messages", error);

        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        }, {status: 500});
        
    }
}

export async function GET(){
    
     await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, {status: 401});
    }

    const userId  = user.id;

     try{
        const foundUser = await UserModel.findById(userId);

     if(!foundUser){
        return Response.json({
            success: false,
            message: "User not found"
        }, {status: 404});
     }
    return Response.json({
        success: true,
        message: "User found",
        data: {
            isAccepttingMessages: foundUser.isAccepttingMessage
        }
    }, {status: 200});

     }catch(error){
        console.log("failed to get user status to accept messages", error);

        return Response.json({
            success: false,
            message: "Failed to get user status to accept messages"
        }, {status: 500});
     }
}
