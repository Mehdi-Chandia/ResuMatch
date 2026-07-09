"use client"

import Link from "next/link";
import resumeIcon from "@/public/human-resources.png"
import Image from "next/image";
import {useState} from "react";
import { IoMdMenu } from "react-icons/io";
import { BiSolidXCircle } from "react-icons/bi";



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <div className="md:h-30 h-15 flex p-4 justify-around items-center gap-3 bg-linear-to-l from-[#10B981] to-[#7C3AED] text-white ">
            <div className="flex gap-2">
                <h2 className="text-3xl font-bold">Resu<span className="text-[#10B981]">Match</span></h2>
               <Image src={resumeIcon} alt={"ResuMatch"} width={33} height={23} />
            </div>
            <ul className="md:flex hidden gap-8 items-center">
              <Link className="hover:text-blue-500  " href={"/"}>  <li>Home</li> </Link>
                <Link className="hover:text-blue-500" href={"/"}> <li>About</li> </Link>
                <Link className="hover:text-blue-500" href={"/"}><li>Contact Us</li> </Link>
                <Link className="hover:text-blue-500" href={"/"}> <li>Services</li> </Link>
            </ul>
         <span onClick={()=> setIsOpen(!isOpen)} className="md:hidden block"> {isOpen ? (<BiSolidXCircle />) : ( <IoMdMenu />)} </span>
        </div>
            {/* mobile menu*/}
            {isOpen && (
                <div className="bg-[#10B981] h-45 p-2 mt-2 rounded-md text-white md:hidden ">
                    <ul className="flex flex-col gap-5 items-center p-2">
                        <Link onClick={()=> setIsOpen(!isOpen)} className="hover:text-blue-500" href={"/"}>  <li>Home</li> </Link>
                        <Link onClick={()=> setIsOpen(!isOpen)} className="hover:text-blue-500" href={"/"}> <li>About</li> </Link>
                        <Link onClick={()=> setIsOpen(!isOpen)} className="hover:text-blue-500" href={"/"}><li>Contact Us</li> </Link>
                        <Link onClick={()=> setIsOpen(!isOpen)} className="hover:text-blue-500" href={"/"}> <li>Services</li> </Link>
                    </ul>
                </div>
            )}
        </>
    )
}
export default Navbar;