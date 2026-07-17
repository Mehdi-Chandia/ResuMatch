"use client"

import {useEffect, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaChartColumn } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { FaComments } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineSportsScore } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import Link from "next/link";


const Dashboard = () => {

    const{data:session, status}=useSession();


    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showReport, setShowReport] = useState(null);

    const [showTechQuestions, setShowTechQuestions] = useState(false);
    const [showBehavioralQuestions, setShowBehavioralQuestions] = useState(false);
    const [showPrepPlan, setShowPrepPlan] = useState(false);

    const router = useRouter();

    const getReports = async () => {
        setLoading(true);
        try {
            const ApiResponse = await fetch("/api/report/get-all", {
                method: "GET",
                credentials: 'include',
                headers: {"Content-Type": "application/json"}
            });

            const data = await ApiResponse.json();
            if (!ApiResponse.ok) {
                throw new Error(data.message || "Error fetching data");
            }

            setReports(data.data);
            // console.log(data.data);
            if (data.data.length > 0) {
                setShowReport(data.data[0]);
            }
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            signOut("credentials", {redirect: false});
            alert("Logged out successfully");
            router.push("/login");
        } catch (err) {
            console.log(err.message);
        }
    };

    const selectReport = (report) => {
        setShowReport(report);
        setSidebarOpen(false);
        setShowTechQuestions(false);
        setShowBehavioralQuestions(false);
        setShowPrepPlan(false);
    };

    useEffect(() => {
        if (status === "unauthenticated"){
            router.push("/login");
            alert("Please log in first");
        }
    }, [status]);

    useEffect(() => {
        getReports();
    }, []);


    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95">

                {/* Animated Icon */}
                <div className="text-6xl text-emerald-400 animate-pulse">
                    <FaFileAlt />
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-3xl font-bold text-white">
                    Loading Reports
                </h2>
                <p className="mt-3 text-gray-400 text-center">
                    Fetching your latest AI analysis...
                </p>

                {/* Animated Dots */}
                <div className="mt-8 flex gap-3">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 animate-bounce"></span>
                    <span
                        className="h-3 w-3 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                        className="h-3 w-3 rounded-full bg-emerald-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                    ></span>
                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-800 relative md:flex">

            {/* top bar mobile only */}
            <div className="md:hidden flex items-center justify-between bg-slate-900 p-4">
                <Link href={"/"} className="text-white font-bold">Resu<span className="text-emerald-400">Match</span></Link>
                <button onClick={() => setSidebarOpen(true)}>
                    <IoMdMenu className="text-white w-7 h-7" />
                </button>
            </div>

            {/* sidebar */}
            <div
                className={`
                    bg-slate-900 p-4 w-64
                    fixed top-0 left-0 h-full z-50
                    transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:static md:h-auto md:min-h-screen
                `}
            >
                {/* close button, mobile only, since sidebar is fixed there */}
                <div className="flex justify-between items-center md:hidden mb-4">
                    <p className="text-white font-bold">Menu</p>
                    <button onClick={() => setSidebarOpen(false)}>
                        <IoMdClose className="text-white w-6 h-6" />
                    </button>
                </div>

                <h3 className="text-gray-200 font-bold text-lg mb-4">Your Reports</h3>

                {loading && <p className="text-gray-400">Loading...</p>}

                {reports.length > 0 ? (
                    reports.map((report) => (
                        <div
                            key={report._id}
                            onClick={() => selectReport(report)}
                            className={`
                                flex flex-row gap-4 mt-3 justify-between items-center
                                border cursor-pointer border-gray-700 rounded-md p-3
                                ${showReport?._id === report._id ? 'bg-emerald-600' : 'bg-slate-800'}
                            `}
                        >
                            <div>
                                <p className="text-lg font-bold text-white">{report.title}</p>
                                <p className="text-gray-400 text-sm">
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-yellow-500 font-bold">{report.matchScore}</p>
                                <p className="text-white text-xs">Score</p>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-gray-400">No reports to show yet!</p>
                )}

                <button
                    onClick={()=> router.push("/")}
                    className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 text-white p-2 rounded-md"
                >
                    Home
                </button>

                <button
                    onClick={()=> router.push("/generate-report")}
                    className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 text-white p-2 rounded-md"
                >
                    Generate New
                </button>


                <button
                    onClick={logout}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 transition-all duration-200  text-white p-2 rounded-md"
                >
                    Logout
                </button>
            </div>

            {/* dark overlay behind sidebar on mobile, closes sidebar on click */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                />
            )}

            {/* main content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">

                {showReport && (
                    <>
                        {/* title + score */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 rounded-md">
                            <div className="">
                                <h3 className="text-slate-400 font-bold text-4xl mb-2">Welcome!<span className="text-white"> {session?.user?.username} </span></h3>
                                 <div className="border-emerald-200 rounded-md p-3 border">
                                     <label className="text-gray-300">Title</label>
                                <p className="text-3xl font-bold text-emerald-500">{showReport.title}</p>
                                <p className="text-gray-400 text-sm">
                                    {new Date(showReport.createdAt).toLocaleDateString()}
                                </p>
                                </div>
                            </div>
                            <div className="text-center bg-slate-900 p-8 rounded-md">
                                <p className={` text-5xl font-bold text-center
                                ${showReport.matchScore > 70 ? 'text-green-400' : 'text-red-400'}`}> {showReport.matchScore} <span className="inline-block text-white"> <MdOutlineSportsScore /></span> </p>
                                <p className="text-gray-300 text-sm">Match Score</p>
                            </div>
                        </div>

                        {/* stat cards row: quick numbers at a glance */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            <div className="bg-slate-900 text-white px-8 py-4 rounded-md text-center">
                                <p className="text-gray-400 text-sm">Match Score</p>
                                <h3 className={`text-3xl font-bold ${showReport.matchScore > 70 ? 'text-emerald-400' : 'text-red-400'}`}>{showReport.matchScore}%</h3>
                            </div>
                            <div className="bg-slate-900 text-white px-8 py-4 rounded-md text-center">
                                <p className="text-gray-400 text-sm">Skill Gaps</p>
                                <h3 className="text-3xl font-bold text-yellow-500">
                                    {showReport.skillGap?.length || 0}
                                </h3>
                            </div>
                            <div className="bg-slate-900 text-white px-8 py-4 rounded-md text-center">
                                <p className="text-gray-400 text-sm">Prep Plan</p>
                                <h3 className="text-3xl font-bold text-sky-400">
                                    {showReport.preparationalPlan?.length || 0} Days
                                </h3>
                            </div>
                        </div>

                        {/* skill gaps */}
                        <div className="mt-6 max-w-2xl mx-auto">
                            <h3 className="text-gray-300 text-xl font-bold mb-3 text-center">Skill Gaps <span className="inline-block"><FaChartColumn/> </span></h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center ">
                                    <p className="text-lg font-medium text-cyan-400">Skills </p>
                                    <p className="text-lg font-medium text-[#7C3AED]">Severity</p>
                                </div>
                                {showReport.skillGap?.map((gap) => (
                                    <div
                                        key={gap._id}
                                        className="flex justify-between items-center bg-slate-900 p-4 rounded-md text-white"
                                    >
                                        <p>{gap.skill}</p>
                                        <p className={`text-sm px-2 py-1 text-white rounded capitalize ${gap.severity === 'high' ? 'bg-red-500' : gap.severity === "medium" ? 'bg-yellow-500' : 'bg-emerald-500'} `}>
                                            {gap.severity}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* technical questions */}
                        <div className="mt-6 bg-slate-900 rounded-md p-4">
                            <div
                                onClick={() => setShowTechQuestions(!showTechQuestions)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <h3 className="text-cyan-400 font-bold">Technical Questions <span className="inline-block"><FaCode/></span></h3>
                                {showTechQuestions ? (
                                    <IoChevronUp className="text-white" />
                                ) : (
                                    <IoChevronDown className="text-white" />
                                )}
                            </div>

                            {showTechQuestions && (
                                <div className="mt-3 flex flex-col gap-4">
                                    {showReport.technicalQuestions?.map((q) => (
                                        <div key={q._id} className="border-t border-gray-700 pt-3">
                                            <p className="text-white font-bold"> <span className="text-red-500 text-xl">Q.</span> {q.question}</p>
                                            <p className="text-gray-400 text-sm mt-1"> <span className="text-blue-400">Why it's asked:</span> {q.intention}</p>
                                            <p className="text-emerald-400 text-sm mt-1"> <span className="text-yellow-400">Prep answer:</span> {q.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* behavioral questions */}
                        <div className="mt-4 bg-slate-900 rounded-md p-4">
                            <div
                                onClick={() => setShowBehavioralQuestions(!showBehavioralQuestions)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <h3 className="text-[#10B981] text-center font-bold">Behavioral Questions <span className="inline-block "> <FaComments/> </span></h3>
                                {showBehavioralQuestions ? (
                                    <IoChevronUp className="text-white" />
                                ) : (
                                    <IoChevronDown className="text-white" />
                                )}
                            </div>

                            {showBehavioralQuestions && (
                                <div className="mt-3 flex flex-col gap-4">
                                    {showReport.behavioralQuestions?.map((q) => (
                                        <div key={q._id} className="border-t border-gray-700 pt-3">
                                            <p className="text-white font-bold"> <span className="text-red-500 text-xl">Q: </span> {q.question}</p>
                                            <p className="text-gray-400 text-sm mt-1"> <span className="text-blue-400">Why it's asked:</span> {q.intention}</p>
                                            <p className="text-emerald-400 text-sm mt-1"> <span className="text-yellow-500">Prep answer:</span> {q.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* preparation plan, collapsible */}
                        <div className="mt-4 bg-slate-900 rounded-md p-4">
                            <div
                                onClick={() => setShowPrepPlan(!showPrepPlan)}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <h3 className="text-yellow-500 font-bold">Preparation Plan <span className="inline-block"> <FaClipboardList/> </span> </h3>
                                {showPrepPlan ? (
                                    <IoChevronUp className="text-white" />
                                ) : (
                                    <IoChevronDown className="text-white" />
                                )}
                            </div>

                            {showPrepPlan && (
                                <div className="mt-3 flex flex-col gap-2">
                                    {showReport.preparationalPlan?.map((step) => (
                                        <div key={step._id} className="border-t border-gray-700 pt-2">
                                            <p className="text-white font-bold">
                                              <span className="text-gray-200"> Day {step.day}: </span> <span className="text-emerald-400">{step.focus}</span>
                                            </p>
                                            <ul className="mt-1 ml-4 list-disc">
                                                {step.tasks?.map((task, i) => (
                                                    <li key={i} className="text-gray-400">{task}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;