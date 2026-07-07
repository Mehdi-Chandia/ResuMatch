import Image from "next/image";

export default function Home() {
  return (
   <div className="bg-[#1E293B] min-h-screen ">
       <div className="flex flex-col justify-center p-8 items-center">
           <h1 className="text-[#10B981] font-bold text-6xl max-w-5xl">Know exactly where your resume falls
               short — before the recruiter does.</h1>
           <p className="text-gray-400 max-w-4xl mt-4">
               Upload your resume and let AI evaluate it against industry standards.
               Receive actionable insights on formatting, ATS optimization, keyword usage, skills,
               and overall quality to help you stand out to recruiters and increase your interview opportunities
           </p>
       </div>
       <div className="flex flex-col gap-6 justify-center items-center">
           <div className="flex gap-6 justify-center items-center">
               <button className="bg-blue-500 px-8 py-4 rounded-md text-white hover:bg-blue-600 transition-all duration-200">Log In</button>
               <button className="bg-[#10B981] px-8 py-4 rounded-md text-white hover:bg-green-500 transition-all duration-200">Sign Up</button>
           </div>
           <button className="bg-cyan-400 px-8 py-4 rounded-md text-white hover:bg-green-500 transition-all duration-200">Start Analyzing</button>
       </div>
   </div>
  );
}
