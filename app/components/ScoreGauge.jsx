"use client"

import { useEffect, useState } from "react";

const ScoreGauge = ({ score = 82, keywordMatch = 91, skillGap = "System design" }) => {

    const [animatedScore, setAnimatedScore] = useState(0);
    const radius = 86;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {

        const timeout = setTimeout(() => {
            const start = performance.now();
            const duration = 1700; // ms

            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                // ease-out curve so it starts fast and settles gently
                const eased = 1 - Math.pow(1 - progress, 3);
                setAnimatedScore(Math.round(eased * score));
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, 150);

        return () => clearTimeout(timeout);
    }, [score]);

    return (
        <>
            {/* keyframes for the glow pulse and the floating chips */}
            <style>{`
                @keyframes gaugeGlow {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.08); }
                }
                @keyframes chipFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }
            `}</style>

            {/* signature element: live-looking score gauge */}
            <div className="relative flex justify-center">
                <div className="relative w-72 h-72">

                    {/* soft glow sitting behind the ring, pulsing */}
                    <div
                        className="absolute inset-6 rounded-full bg-[#10B981] blur-2xl"
                        style={{ animation: "gaugeGlow 2.6s ease-in-out infinite" }}
                    />

                    <svg viewBox="0 0 200 200" className="relative w-full h-full -rotate-90">
                        <circle cx="100" cy="100" r={radius} fill="none" stroke="#1C2437" strokeWidth="14" />
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference * (1 - animatedScore / 100)}
                            style={{ transition: "stroke-dashoffset 0.1s linear" }}
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                            className="text-6xl font-bold"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            {animatedScore}
                        </span>
                        <span className="text-[#7C8699] text-sm mt-1 tracking-wide">Match Score</span>
                    </div>

                    {/* floating context chips, gently bobbing, staggered */}
                    <div
                        className="absolute -left-8 top-6 bg-[#131A2A] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-lg"
                        style={{ animation: "chipFloat 3.2s ease-in-out infinite" }}
                    >
                        <span className="text-[#7C8699]">Keyword match</span>
                        <div className="font-medium" style={{ fontFamily: "var(--font-mono)" }}>{keywordMatch}%</div>
                    </div>
                    <div
                        className="absolute -right-10 bottom-10 bg-[#131A2A] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-lg"
                        style={{ animation: "chipFloat 3.6s ease-in-out infinite", animationDelay: "0.6s" }}
                    >
                        <span className="text-[#F59E0B]">Skill gap</span>
                        <div className="font-medium">{skillGap}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScoreGauge;