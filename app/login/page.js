"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {useRouter} from "next/dist/client/components/navigation";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {useState} from "react";



const Login = () => {
    const[showPassword,setShowPassword]=useState(false)

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },
    } = useForm();

    const onSubmit =async (data) => {
        console.log(data);

        try {
            const res=await signIn("credentials",{
                email:data.email,
                password:data.password,
                redirect:false
            })
            console.log(res)
            if (res?.error) {
                if (res.error === "CredentialsSignin") {
                    throw new Error("Invalid email or password");
                }
                throw new Error("Something went wrong");
            }
            alert("Logged in successfully");
            router.push("/")
        }catch(err) {
            console.log(err);
            alert(err.message)
        }

    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#0A0E1A] p-4">
            <div className="w-full max-w-md bg-[#131A2A] border border-white/10 rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="header mt-2 text-center">
                    <h2 className="text-3xl font-bold text-[#4F46E5]">Welcome Back</h2>
                    <p className="text-md text-[#7C8699]">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <div className="mt-4">
                        <label className="block font-semibold text-[#E8EAF0] mb-1">Email</label>
                        <input
                            className={`w-full focus:outline-none border px-3 py-2 rounded-lg bg-[#0A0E1A] text-[#E8EAF0] placeholder:text-[#7C8699]/60 ${
                                errors.email ? "border-red-500" : "border-white/10"
                            }`}
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mt-4">
                        <label className="block font-semibold text-[#E8EAF0] mb-1">Password</label>
                        <input
                            className={`w-full relative focus:outline-none border px-3 py-2 rounded-lg bg-[#0A0E1A] text-[#E8EAF0] placeholder:text-[#7C8699]/60 ${
                                errors.password ? "border-red-500" : "border-white/10"
                            }`}
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required" })}
                            placeholder="Enter your password"
                        />
                        <span className={"absolute invert right-134 p-3"} onClick={()=> setShowPassword(!showPassword)}>
                             {showPassword ? <IoMdEye />  : <IoMdEyeOff /> }
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            className={`w-full bg-[#10B981] text-white rounded-lg px-4 py-3 hover:bg-[#0DA271] transition-colors 
                            duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? "cursor-not-allowed" : ""}`}
                            type="submit"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center">
                        <p className="text-[#7C8699]">
                            Using for first time?{" "}
                            <Link className="text-[#4F46E5] hover:text-[#6366F1]" href="/register">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;