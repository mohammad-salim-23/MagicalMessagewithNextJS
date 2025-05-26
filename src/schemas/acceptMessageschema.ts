import { z } from "zod";

export const  AcceptmessageSchema= z.object({
    acceptMessage: z.boolean(),
})