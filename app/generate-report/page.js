"use client"

import {useRouter} from "next/dist/client/components/navigation";
import {useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import { FaRobot } from "react-icons/fa";
import {toast} from "react-toastify";

const GenerateReport = () => {

    const {data:session, status} = useSession();
    const [isLoading,setIsLoading]=useState(false);
    const router = useRouter();

    console.log("logged in user ",session?.user);

    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },
    } = useForm();

    const onSubmit =async (data) => {
        // console.log(data);
        setIsLoading(true);
        const formData=new FormData()
        formData.append("resume",data.resume[0])
        formData.append("jobDescription",data.jobDescription)
        formData.append("selfDescription",data.selfDescription)

        try {
            const response=await fetch("/api/report",{
                method:"POST",
                body:formData
            })

            const res=await response.json();
            if (!response.ok){
                throw new Error( res?.message || "Failed to save report")
            }

            console.log(res)
            router.push("/dashboard")

        }catch(err){
            console.log(err)
            toast.error(err.message)
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (status ==="unauthenticated"){
            router.push("/login")
            alert("please login first")
        }
    }, [status]);


    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-slate-950/95 flex flex-col justify-center items-center z-50">

                {/* Animated Robot */}
                <div className="animate-bounce text-emerald-400 text-7xl">
                    <FaRobot />
                </div>

                {/* Heading */}
                <h2 className="mt-8 text-3xl font-bold text-white">
                    AI is analyzing your resume
                </h2>

                {/* Animated Dots */}
                <div className="flex gap-3 mt-8">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-bounce"></span>
                    <span
                        className="w-3 h-3 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                        className="w-3 h-3 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                    ></span>
                </div>

                <p className="mt-8 text-sm text-gray-500">
                    This usually takes 10–15 seconds...
                </p>

            </div>
        );
    }

    return (
        <>
            <div className="bg-[#0A0E1A] min-h-screen flex flex-col justify-center items-center gap-4 p-4 py-10">
                <h1 className="text-3xl md:text-5xl text-[#10B981] font-bold  text-center">
                    Generate Your AI Resume Report
                </h1>

                <p className="text-gray-400 text-center mt-4 max-w-3xl">
                    Upload your resume and paste the job description to receive an AI-powered
                    ATS score, skill gap analysis, keyword matching, and personalized
                    recommendations to improve your chances of getting hired.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}
                      className="mt-10 flex flex-col md:flex-row gap-8 bg-white/10 w-full max-w-3xl h-full justify-around items-center md:items-stretch rounded-2xl p-4 md:p-8">

                    <div className="w-full md:w-auto">
                        {/*job desc*/}
                        <h3 className="text-[#10B981] text-xl font-bold">Paste Job description</h3>
                        <p className="text-sm text-gray-400 mb-2">Paste the complete job description of the position you're applying for.</p>
                        <textarea
                            {...register("jobDescription", {required: {value:true, message:"Please enter job description"},
                                minLength:{value:50, message:"Please enter atleast 50 characters"},
                            })}
                            className={`w-full md:w-80 mt-4 h-60 outline-none border text-gray-400
                          ${errors.jobDescription ? 'border-red-400' : 'border-[#10B981]'} p-4 rounded-md`} placeholder="paste job description here"/>
                        {errors.jobDescription && (<p className="text-red-500 text-sm mt-1">{errors.jobDescription.message}</p>)}
                    </div>

                    <div className="hidden md:block h-full w-0.5 bg-[#10B981]"></div>

                    <div className="w-full md:w-auto">
                        {/*resume upload*/}
                        <p className="text-[#10B981] text-xl font-bold ">Upload Resume</p>
                        <input
                            accept=".pdf,.doc,.docx"
                            {...register("resume",{required:"resume is required",
                                validate: {
                                    fileSize: (files) =>
                                        files[0]?.size <= 2 * 1024 * 1024 ||
                                        "File size must be less than 2MB",
                                },
                            })}
                            className={`border ${errors.resume ? 'border-red-400' : 'border-gray-200'} 
                            rounded-md mt-2 mb-2 p-2 text-gray-200 w-full`}
                            type={"file"} placeholder={"add your resume"}/>
                        {errors.resume && (<p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>)}
                        <p className="text-sm text-blue-400 mb-6">Only in PDF or DOCX format. <span className="text-gray-400">(Max 2MB file)</span></p>

                        {/*self desc*/}
                        <p className="text-gray-200 text-xl font-bold">Self description here</p>
                        <p className="text-sm text-gray-400 mb-2">Tell us a little about yourself, your career goals, strengths, or the type of role you're targeting</p>
                        <textarea
                            {...register("selfDescription", {required: {value:true, message:"Please enter self description"},
                                minLength:{value:50, message:"Please enter atleast 50 characters"},
                            })}
                            className={`w-full md:w-80 mt-4 h-40 outline-none border text-gray-400
                         ${errors.selfDescription ? 'border-red-400' : 'border-[#10B981]'} p-4 rounded-md`} placeholder="paste self description here"/>
                        {errors.selfDescription && (<p className="text-red-500 text-sm mt-1">{errors.selfDescription.message}</p>)}

                        <button type={"submit"} className={`bg-[#10B981] text-white px-8 mt-6 py-4 rounded-md w-full md:w-auto
                        hover:bg-green-500 transition-all duration-200 ${isSubmitting ? 'cursor-not-allowed' : ''}`}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>

                        <button
                            onClick={()=> router.push("/")}
                            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 text-white p-2 rounded-md"
                        >
                           Back to Home
                        </button>
                    </div>

                </form>

            </div>
        </>
    )
}
export default GenerateReport;