"use client"

import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import { FaLongArrowAltRight } from "react-icons/fa"

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
                    <button className="px-5 py-2 text-sm rounded-md text-[#E8EAF0] hover:bg-white/5 transition-colors">
                        Log In
                    </button>
                    <button className="px-5 py-2 text-sm rounded-md bg-[#4F46E5] hover:bg-[#4338CA] transition-colors">
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative max-w-7xl mx-auto px-8 pt-12 pb-24 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7C8699] border border-white/10 rounded-full px-3 py-1 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        AI-powered resume analysis
                    </div>
                    <h1
                        className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Know exactly where your resume falls short.
                    </h1>
                    <p className="text-[#7C8699] text-lg mt-6 max-w-lg leading-relaxed">
                        Paste your resume and a job description. Get a real match score,
                        a breakdown of what's missing, and interview questions built
                        around your actual gaps — before a recruiter finds them for you.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-10">
                        <button className="group px-7 py-3.5 rounded-md bg-[#10B981] hover:bg-[#0DA271] font-medium transition-colors flex items-center gap-2">
                            Start Analyzing
                            <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-7 py-3.5 rounded-md border border-white/15 hover:bg-white/5 font-medium transition-colors">
                            See a sample report
                        </button>
                    </div>
                </div>

                {/* signature element: live-looking score gauge */}
                <div className="relative flex justify-center">
                    <div className="relative w-72 h-72">
                        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                            <circle cx="100" cy="100" r="86" fill="none" stroke="#1C2437" strokeWidth="14" />
                            <circle
                                cx="100"
                                cy="100"
                                r="86"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="14"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 86}
                                strokeDashoffset={2 * Math.PI * 86 * (1 - 0.82)}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                  className="text-6xl font-bold"
                  style={{ fontFamily: "var(--font-mono)" }}
              >
                82
              </span>
                            <span className="text-[#7C8699] text-sm mt-1 tracking-wide">Match Score</span>
                        </div>

                        {/* floating context chips */}
                        <div className="absolute -left-8 top-6 bg-[#131A2A] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-lg">
                            <span className="text-[#7C8699]">Keyword match</span>
                            <div className="font-medium" style={{ fontFamily: "var(--font-mono)" }}>91%</div>
                        </div>
                        <div className="absolute -right-10 bottom-10 bg-[#131A2A] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-lg">
                            <span className="text-[#F59E0B]">Skill gap</span>
                            <div className="font-medium">System design</div>
                        </div>
                    </div>
                </div>
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
                <button className="mt-8 px-8 py-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] font-medium transition-colors">
                    Analyze My Resume — Free
                </button>
            </section>
        </div>
    )
}