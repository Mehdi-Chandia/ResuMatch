import asyncHandler from "@/app/utils/asyncHandler";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import ApiResponse from "@/app/utils/apiResponse";
import ApiError from "@/app/utils/apiError";
import dbConnection from "@/app/lib/mongodb";
import InterviewReportModel from "@/app/models/interviewReport.model";


export const GET=asyncHandler(async (request,{params}) => {

    const {id} =await params;

    if (!id) throw new ApiError(400,"id is required");

    const session=await getServerSession(authOptions)
    if(!session || !session?.user?.id){
        throw new ApiError(401, "Not authorized");
    }

    await dbConnection();

    const report=await InterviewReportModel.findById({_id:id})

    if (!report) throw new ApiError(404, "no report found with given id");

    return Response.json(
        new ApiResponse(200, report, "Report found with given id")
    )
})