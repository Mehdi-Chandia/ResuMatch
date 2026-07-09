import {signUpSchema} from "@/app/validation/joi.validation";
import ApiError from "@/app/utils/apiError";
import asyncHandler from "@/app/utils/asyncHandler";
import bcrypt from 'bcrypt'
import UserModel from "@/app/models/user.model";
import ApiResponse from "@/app/utils/apiResponse";
import dbConnection from "@/app/lib/mongodb";

export const POST=asyncHandler(async (request)=>{

    const body = await request.json()
    console.log(body)

    const {error}=signUpSchema.validate(body,{abortEarly: false});
    if(error){
      throw new ApiError(400,error.details[0].message);
    }

    await dbConnection();
    const {username, password, email}=body;

    const user=await UserModel.findOne({email})
    if(user){
        throw new ApiError(400,"User already exists");
    }

    const hashPassword=await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
        username,
        password: hashPassword,
        email,
    })

    const userResponse=newUser.toObject();
    delete userResponse.password

    return Response.json(
        new ApiResponse(
            201,
            userResponse,
             "user created successfully",
        )
        ,{status:201}
    )

})