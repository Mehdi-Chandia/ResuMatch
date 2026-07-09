"use client"

const generateReport = () => {
    return (
        <>
            <div className="bg-[#0A0E1A] h-screen flex flex-col justify-center items-center gap-4 p-4">
                <h1 className="text-5xl text-[#10B981] font-bold  text-center">
                    Generate Your AI Resume Report
                </h1>

                <p className="text-gray-400 text-center mt-4 max-w-3xl">
                    Upload your resume and paste the job description to receive an AI-powered
                    ATS score, skill gap analysis, keyword matching, and personalized
                    recommendations to improve your chances of getting hired.
                </p>

                <div className="mt-10 flex gap-6 bg-white/10 w-full max-w-3xl justify-center items-center rounded-2xl p-8">
                    <div>
                        <h3>Paste Job description</h3>
                        <textarea className="w-40 h-40" placeholder="paste job description here"/>
                    </div>
                    <div>
                        <p>Upload Resume</p>
                        <p>Self description here</p>
                    </div>
                </div>

            </div>
        </>
    )
}
export default generateReport;