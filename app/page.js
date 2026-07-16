"use client"

import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import { FaLongArrowAltRight } from "react-icons/fa"
import {useRouter} from "next/dist/client/components/navigation";
import ScoreGauge from "@/app/components/ScoreGauge";
import {motion} from "framer-motion";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" })
const body = Inter({ subsets: ["latin"], variable: "--font-body" })
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-mono" })

const steps = [
    {
        n: "01",
        title: "Upload your resume",
        copy: "Drop in a PDF or DOCX — we read it straight from the file, no reformatting needed.",
    },
    {
        n: "02",
        title: "Paste the job description",
        copy: "Add the JD (and a quick self-description if you want sharper questions).",
    },
    {
        n: "03",
        title: "Get your gap score",
        copy: "See exactly what's missing, how severe it is, and a day-by-day plan to close it.",
    },
]

export default function Home() {

    const router=useRouter();

    return (
        <div
            className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-[#0A0E1A] text-[#E8EAF0]`}
            style={{ fontFamily: "var(--font-body)" }}
        >
            {/* subtle background grid, evokes a document being scanned */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <nav className="relative flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
        >
          What you <span className="text-[#10B981]">waiting</span> for
        </span>
                <div className="flex gap-3">
                    <button onClick={()=> router.push("/login")} className="px-5 py-2 text-sm rounded-md text-[#E8EAF0] hover:bg-white/5 transition-colors">
                        Log In
                    </button>
                    <button onClick={()=> router.push("/register")} className="px-5 py-2 text-sm rounded-md bg-[#4F46E5] hover:bg-[#4338CA] transition-colors">
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative max-w-7xl mx-auto px-8 pt-12 pb-24 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C8699] border border-white/10 rounded-full px-3 py-1 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"  />
                        AI-powered resume analysis
                    </div>

                    <motion.h1
                        initial={{opacity:0,y:-100}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:1}}

                        className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Know exactly where your <span  className="text-[#10B981] animate-pulse text-6xl"  >Resume</span> falls short.
                    </motion.h1>
                    <motion.p
                        initial={{opacity:0,y:100}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:1,delay:1}}

                        className="text-[#7C8699] text-lg mt-6 max-w-lg leading-relaxed">
                        Paste your resume and a job description. Get a real match score,
                        a breakdown of what's missing, and interview questions built
                        around your actual gaps — before a recruiter finds them for you.
                    </motion.p>

                    <div className="flex flex-wrap items-center gap-4 mt-10">
                        <button onClick={()=> router.push("/generate-report")} className="group px-7 py-3.5 rounded-md bg-[#10B981] hover:bg-[#0DA271] font-medium transition-colors flex items-center gap-2">
                            Start Analyzing
                            <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={()=> router.push("/dashboard")} className="px-7 py-3.5 rounded-md border border-white/15 hover:bg-white/5 font-medium transition-colors">
                            View all your generated reports
                        </button>
                    </div>
                </div>

                {/*score gauge section*/}
                <ScoreGauge/>

            </section>

            {/* HOW IT WORKS */}
            <section className="relative max-w-7xl mx-auto px-8 pb-28">
                <h2
                    className="text-3xl font-bold text-center mb-16"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    How it works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((s, i) => (
                        <div key={s.n} className="relative">
              <span
                  className="text-5xl font-bold text-white/10"
                  style={{ fontFamily: "var(--font-mono)" }}
              >
                {s.n}
              </span>
                            <h3 className="text-xl font-semibold mt-3">{s.title}</h3>
                            <p className="text-[#7C8699] mt-2 leading-relaxed">{s.copy}</p>
                            {i < steps.length - 1 && (
                                <FaLongArrowAltRight className="hidden md:block absolute -right-6 top-2 text-white/15 text-xl" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative max-w-3xl mx-auto px-8 pb-28 text-center">
                <h2
                    className="text-3xl md:text-4xl font-bold leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    Stop guessing why you're not getting callbacks.
                </h2>
                <button onClick={()=> router.push("/generate-report")} className="mt-8 px-8 py-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] font-medium transition-colors">
                    Analyze My Resume — Free
                </button>
            </section>
        </div>
    )
}