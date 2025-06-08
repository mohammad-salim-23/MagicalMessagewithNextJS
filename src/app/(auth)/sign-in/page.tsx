/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { useDebounceValue } from 'usehooks-ts'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios from 'axios';
import { de } from "zod/v4/locales";
const Page = ()=>{
  const [username , setusername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceValue(username , 300);
 const router = useRouter();

 //zod implementation
 const from = useForm<z.infer<typeof signUpSchema>>({
  resolver:zodResolver(signUpSchema),
  defaultValues:{
    username:"",
    email:"",
    password:"",
  }
 })

 useEffect(()=>{
  const checkUsernameUnique = async()=>{
    if(debouncedUsername){
      setIsCheckingUsername(true)
      setUsernameMessage("")
      try{
        const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
      console.log(response);
      setUsernameMessage(response.data.message);
    }catch(error){

    }
  }
 }}, [debouncedUsername]);
  return (
    <div>
    pagew
    </div>
  )
}
export default Page;