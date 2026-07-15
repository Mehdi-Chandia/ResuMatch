import asyncHandler from "@/app/utils/asyncHandler";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import dbConnection from "@/app/lib/mongodb";
import InterviewReportModel from "@/app/models/interviewReport.model";
import ApiResponse from "@/app/utils/apiResponse";
import ApiError from "@/app/utils/apiError";

export const GET=asyncHandler(async (request) => {
    const session=await getServerSession(authOptions);
    console.log("session",session?.user);

    if(!session || !session.user.id){
        throw new ApiError(401, "Not authorized");
    }

    await dbConnection();

    const Reports=await InterviewReportModel.find({user:session?.user?.id}).sort({createdAt:-1})
    console.log(Reports)

    if(!Reports){
        throw new ApiError(404, "No Reports Found for logging in user");
    }

    return Response.json(
        new ApiResponse(200,Reports,"Reports Found"),
    )
})