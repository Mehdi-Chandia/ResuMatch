const AboutPage = () => {
    return (
        <div className="bg-[#0A0E1A] min-h-screen px-4 py-16">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl md:text-5xl text-[#10B981] font-bold text-center">
                    About ResuMatch
                </h1>

                <p className="text-gray-400 text-center mt-4">
                    We help job seekers understand exactly where their resume stands,
                    and what to do about it.
                </p>

                <div className="mt-12">
                    <h2 className="text-white text-2xl font-bold mb-2">Our Mission</h2>
                    <p className="text-gray-400">
                        Applying for jobs shouldn't feel like guesswork. ResuMatch compares
                        your resume against a real job description using AI, and shows you a
                        clear match score, the skills you're missing, and the questions you
                        should be ready to answer in an interview. No fluff, just a clear
                        picture of where you stand.
                    </p>
                </div>

                <div className="mt-10">
                    <h2 className="text-white text-2xl font-bold mb-4">How It Works</h2>
                    <div className="flex flex-col gap-4">
                        <div className="border border-[#10B981] rounded-md p-4">
                            <h3 className="text-[#10B981] font-bold">1. Share your details</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Upload your resume, paste the job description, and tell us a bit
                                about yourself.
                            </p>
                        </div>
                        <div className="border border-[#10B981] rounded-md p-4">
                            <h3 className="text-[#10B981] font-bold">2. AI analyzes the fit</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Our model reads through everything and scores how well you match
                                the role.
                            </p>
                        </div>
                        <div className="border border-[#10B981] rounded-md p-4">
                            <h3 className="text-[#10B981] font-bold">3. Get your report</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                See your skill gaps, a prep plan, and likely interview questions,
                                all saved to your dashboard.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-white text-2xl font-bold mb-2">Why We Built This</h2>
                    <p className="text-gray-400">
                        Most job seekers only find out they're missing a skill after getting
                        rejected. We wanted a tool that tells you that upfront, along with a
                        plan to actually fix it before your next interview.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;