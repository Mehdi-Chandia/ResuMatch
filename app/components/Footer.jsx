import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#0A0E1A] border-t border-gray-800 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8">

                {/* brand */}
                <div>
                    <h3 className="text-[#10B981] text-2xl font-bold">ResuMatch</h3>
                    <p className="text-gray-400 text-sm mt-2 max-w-xs">
                        AI-powered resume analysis. Find your gaps, close them, and get hired.
                    </p>
                </div>

                {/* nav links */}
                <div className="flex gap-16">
                    <div>
                        <h4 className="text-white font-bold mb-3">Product</h4>
                        <ul className="flex flex-col gap-2 text-gray-400 text-sm">
                            <li><Link href="/dashboard" className="hover:text-[#10B981]">Dashboard</Link></li>
                            <li><Link href="/generate" className="hover:text-[#10B981]">Generate Report</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-3">Company</h4>
                        <ul className="flex flex-col gap-2 text-gray-400 text-sm">
                            <li><a href="/about" className="hover:text-[#10B981]">About</a></li>
                            <li><a href="/contact" className="hover:text-[#10B981]">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 py-4">
                <p className="text-gray-500 text-sm text-center">
                    © {new Date().getFullYear()} ResuMatch. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;