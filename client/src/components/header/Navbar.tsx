"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { logoutUser } from "@/lib/store/auth/authSlice";

const Navbar = () => {

    const { user } = useAppSelector((store) => store.auth);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }
    return (
        <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-[#714af5] p-2 rounded-xl">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">EduCourse</span>
                </div>
                <div className="flex items-center space-x-10 text-white font-medium bg-[#714af5]/20 px-6 py-2 rounded-md">
                    <div className="hover:underline">About Us</div>
                    <div className="hover:underline">Teams</div>
                    <div className="hover:underline">Pricing</div>
                    <div className="hover:underline">Blog</div>
                    <div className="hover:underline">Contact Us</div>
                </div>
                {user.email ? (
                    <div>
                        <Link href="/">
                            <Button onClick={handleLogout} className="bg-[#714af5] hover:bg-[#5a3bd4] text-white">
                                Logout
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link href="/auth/login">
                            <Button
                                variant="ghost"
                                className="text-white hover:text-[#714af5]"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button className="bg-[#714af5] hover:bg-[#5a3bd4] text-white">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar