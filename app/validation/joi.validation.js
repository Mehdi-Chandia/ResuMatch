import joi from "joi";

export const signUpSchema=joi.object({
    username: joi.string().min(3).max(25).required(),
    password: joi.string().min(6).required(),
    email: joi.string().email().required(),
})

export const resumeSchema=joi.object({
    resume:joi.required(),
    selfDescription: joi.string().min(20).required(),
    jobDescription: joi.string().min(20).required(),
})
