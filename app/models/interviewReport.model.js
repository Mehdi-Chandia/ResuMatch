import mongoose from "mongoose";

const technicalQuestionsSchema =new mongoose.Schema({
    question: {
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
})

const behavioralQuestionsSchema =new mongoose.Schema({
    question: {
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
})

const skillGapSchema =new mongoose.Schema({
    skill: {
        type:String,
        required:true
    },
    severity: {
        type:String,
        enum:["low","medium","high"],
        required:true
    }
})

const preprationalPlanSchema =new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    focus:{
        type:String,
        required:true
    },
    tasks:[{
        type:String,
        required:true
    }]
})

const interviewReportSchema =new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true,
    },
    resume:{
        type:String,

    },
    selfDescription: {
        type: String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    title:{
        type: String,
        required:true
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGap:[skillGapSchema],
    preparationalPlan:[preprationalPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},{ timestamps: true });

export default mongoose.models.InterviewReport || mongoose.model("InterviewReport", interviewReportSchema);