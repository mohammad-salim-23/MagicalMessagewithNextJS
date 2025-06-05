import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import {Message} from "@/model/User";

export async function POST (request:Request){
    await dbConnect();

    const {username, content} = await request.json();
    try{

        const user = await UserModel.findOne({username: decodeURIComponent(username)});
        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            }, {status: 404});
        }
        
        //is user accepting messages
        if(!user.isAccepttingMessage){
            return Response.json({
                success: false,
                message: "User is not accepting messages"
            }, {status: 403});
        }
 const newMessage = {content, createdAt: new Date()} as Message;
    user.messages.push(newMessage);
     await user.save();
        return Response.json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        }, {status: 200});
        
    }catch(error){
        console.log("Failed to send message", error);
        return Response.json({
            success: false,
            message: "Failed to send message"
        }, {status: 500});
    }
}