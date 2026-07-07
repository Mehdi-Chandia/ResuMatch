import asyncHandler from "@/app/utils/asyncHandler";
import {GoogleGenAI} from "@google/genai";
import apiResponse from "@/app/utils/apiResponse";

const ai=new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

export const GET=asyncHandler(async (request)=>{
    console.log("api key ",process.env.GOOGLE_API_KEY)
    const res=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"hello gemini! explain what is interview ?"
    })

    console.log(res.text)

    return Response.json(
     new apiResponse(200,null,'ai is working')
        ),{status:200}
})