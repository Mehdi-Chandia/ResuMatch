"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/dist/client/components/navigation";
import {useState} from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
    const [showPassword, setShowPassword]=useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors,isSubmitting },
    } = useForm();

    const onSubmit =async (data) => {
        console.log(data);

        try {
            const response=await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const res=await response.json();
            console.log(response.status)
            if (!response.ok) {
                throw new Error( res?.message || "Error occured");
            }

            console.log(res);
            alert(res.message)

            router.push("/login");
        }catch(err) {
            console.log(err.message);
            alert(err.message)
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#0A0E1A] p-4">
            <div className="w-full max-w-md bg-[#131A2A] border border-white/10 rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="header mt-2 text-center">
                    <h2 className="text-3xl font-bold text-[#4F46E5]">Create Account</h2>
                    <p className="text-md text-[#7C8699]">Start finding your gaps</p>
                </div>

                {/* Sign Up Form */}
                <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Input */}
                    <div className="mt-4">
                        <label className="block font-semibold text-[#E8EAF0] mb-1">Username</label>
                        <input
                            className={`w-full focus:outline-none border px-3 py-2 rounded-lg bg-[#0A0E1A] text-[#E8EAF0] placeholder:text-[#7C8699]/60 ${
                                errors.username ? "border-red-500" : "border-white/10"
                            }`}
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            placeholder="Enter your username"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

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
                            className={`w-full focus:outline-none border px-3 py-2 rounded-lg bg-[#0A0E1A] text-[#E8EAF0] placeholder:text-[#7C8699]/60 ${
                                errors.password ? "border-red-500" : "border-white/10"
                            }`}
                            type={showPassword ? 'text' : 'password'}
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
                            className={`w-full bg-[#10B981] text-white rounded-lg px-4 py-3 hover:bg-[#0DA271] 
                            transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                            type="submit"
                        >
                            {isSubmitting ? 'Signing up' : 'Sign in'}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-4 text-center">
                        <p className="text-[#7C8699]">
                            Already have an account?{" "}
                            <Link className="text-[#4F46E5] hover:text-[#6366F1]" href="/login">
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;