/* eslint-disable @typescript-eslint/no-explicit-any */
//credentials doc->next-auth
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
   CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
       async authorize(credentials:any):Promise<any>{
        await dbConnect()

        try{
           const user= await UserModel.findOne({
           $or:[
            {email:credentials.identifier},
            {username: credentials.identifier}
           ]
           })
        if(!user){
            throw new Error('No user found with this email')
        }
       if(!user.isVerified){
        throw new Error('please verify your account before login');
       }
       const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password);

       if (isPasswordCorrect) {
  return {
    _id: (user as { _id: any })._id.toString(),
    username: user.username,
    email: user.email,
    isVerified: user.isVerified,
    isAcceptingMessages: user.isAccepttingMessage
  };
}
       else{
        throw new Error('Incorrect password');
       }
        }catch(err:any){
            throw new Error(err); 
        }
       }
    }),
  ],

  callbacks:{
     async jwt({ token, user }) {
  if (user) {
    token._id = user._id?.toString();
    token.isVerified = user.isVerified;
    token.isAcceptingMessages = user.isAcceptingMessages;
    token.username = user.username;
  }
  return token;
},
     async session({ session, token }) {
      if (token) {
    session.user = {
      ...session.user,
      _id: token._id,
      isVerified: token.isVerified,
      isAcceptingMessages: token.isAcceptingMessages,
      username: token.username,
    };
  }
      return session
    }
   
  },
  pages:{
    signIn:"/sign-in"
  },
  session: {
    strategy:"jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,

};


