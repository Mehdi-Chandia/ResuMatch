"use client"

import {usePathname} from "next/dist/client/components/navigation";
import Navbar from "@/app/components/Navbar";


export default function NavbarWrapper() {

    const pathname=usePathname();

    if (["/login","/register","/generate-report","/dashboard"].includes(pathname)){
        return null
    }else {
        return <Navbar/>
    }
}