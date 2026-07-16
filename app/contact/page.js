"use client"

import {useForm} from "react-hook-form";

const ContactPage = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        alert("Thanks! We'll get back to you soon.");
        reset();
    };

    return (
        <div className="bg-[#0A0E1A] min-h-screen flex flex-col justify-center items-center p-4 py-16">

            <h1 className="text-4xl md:text-5xl text-[#10B981] font-bold text-center">
                Get In Touch
            </h1>

            <p className="text-gray-400 text-center mt-4 max-w-md">
                Questions, feedback, or found a bug? Send us a message and we'll get back
                to you.
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-10 w-full max-w-md bg-white/10 rounded-2xl p-8 flex flex-col gap-4"
            >
                <div>
                    <label className="text-gray-200 text-sm">Name</label>
                    <input
                        {...register("name", {required: "Please enter your name"})}
                        className={`w-full mt-1 outline-none border text-gray-400
                        ${errors.name ? 'border-red-400' : 'border-[#10B981]'} p-3 rounded-md`}
                        placeholder="Your name"
                    />
                    {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
                </div>

                <div>
                    <label className="text-gray-200 text-sm">Email</label>
                    <input
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email"}
                        })}
                        className={`w-full mt-1 outline-none border text-gray-400
                        ${errors.email ? 'border-red-400' : 'border-[#10B981]'} p-3 rounded-md`}
                        placeholder="you@example.com"
                    />
                    {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
                </div>

                <div>
                    <label className="text-gray-200 text-sm">Message</label>
                    <textarea
                        {...register("message", {
                            required: "Please enter a message",
                            minLength: {value: 10, message: "Please enter atleast 10 characters"}
                        })}
                        className={`w-full mt-1 outline-none border text-gray-400 h-32
                        ${errors.message ? 'border-red-400' : 'border-[#10B981]'} p-3 rounded-md`}
                        placeholder="How can we help?"
                    />
                    {errors.message && (<p className="text-red-500 text-sm mt-1">{errors.message.message}</p>)}
                </div>

                <button
                    type="submit"
                    className={`bg-[#10B981] text-white px-8 py-3 rounded-md
                    hover:bg-green-500 transition-all duration-200 ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            <p className="text-gray-500 text-sm mt-8">
                Or email us directly at <span className="text-[#10B981]">support@resumatch.com</span>
            </p>

        </div>
    );
};

export default ContactPage;