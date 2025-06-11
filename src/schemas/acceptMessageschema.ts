import { z } from "zod";

export const  AcceptmessageSchema= z.object({
    acceptMessages: z.boolean(),
})