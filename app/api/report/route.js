import { resumeSchema } from "@/app/validation/joi.validation";
import ApiError from "@/app/utils/apiError";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import asyncHandler from "@/app/utils/asyncHandler";
import mammoth from "mammoth";
import { generateReport } from "@/app/services/generateReport";
import apiResponse from "@/app/utils/apiResponse";
import InterviewReportModel from "@/app/models/interviewReport.model";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import dbConnection from "@/app/lib/mongodb";

export const POST = asyncHandler(async (request) => {
    // const session=await getServerSession(authOptions)
    // console.log("logged in user ",session?.user)

    const formData = await request.formData();

    const file = formData.get("resume");
    const selfDescription = formData.get("selfDescription");
    const jobDescription = formData.get("jobDescription");

    const { error } = resumeSchema.validate(
        { resume: file, selfDescription, jobDescription },
        { abortEarly: false }
    );
    if (error) throw new ApiError(400, error.details[0].message);

    if (!file) throw new ApiError(400, "file is required");

    const buffer = Buffer.from(await file.arrayBuffer());

    let resumeText = "";
    if (file.type === "application/pdf") {
        const result = await pdfParse(buffer);
        resumeText = result.text;
    } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const res = await mammoth.extractRawText({ buffer });
        resumeText = res.value;
    } else {
        throw new ApiError(400, "invalid file type");
    }

    await dbConnection();

    const aiGeneratedData = await generateReport({resumeText, selfDescription, jobDescription});
    console.log("data coming in route ",aiGeneratedData?.title)


    const report=await InterviewReportModel.create({
        resume:resumeText,
        selfDescription,
        jobDescription,
        title:aiGeneratedData.title,
        matchScore:aiGeneratedData.matchScore,
        technicalQuestions:aiGeneratedData.technicalQuestions,
        behavioralQuestions:aiGeneratedData.behavioralQuestions,
        skillGap:aiGeneratedData.skillGap,
        preparationalPlan:aiGeneratedData.preprationalPlan,

    })

    if (!report){
        throw new ApiError(400, "report generation failed");
    }

    return Response.json(new apiResponse(201, report, "report generated successfully."));
});