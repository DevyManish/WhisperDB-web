"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./user-avatar";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="h-full w-full md:w-2/3 bg-black/30 rounded-4xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 sticky top-3 z-40">
            <nav className="container w-19/20 flex justify-between items-center mx-auto px-6 h-16 ">
                <div className="flex items-center mb-1 space-x-2">
                    <p className=" mt-1  text-xl md:text-3xl font-extrabold bg-gradient-to-r from-green-500 via-green-400 to-green-300 bg-clip-text text-transparent">
                        <Link href="/">WhisperDB</Link>
                    </p>
                </div>

                {isOpen ? (
                    <div className="bg-black/30 rounded-4xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 absolute top-[64px] left-0 w-full flex flex-col gap-6 items-center py-3 text-lg font-semibold">
                        <div className="flex flex-col items-center gap-6">
                            <Link href="/">
                                <div className="flex items-center">
                                    <div className="mt-1 ml-1 ">Features</div>
                                </div>
                            </Link>
                            <Link href="/team">
                                <div className="flex items-center">
                                    <div className="mt-1 ml-1">About Us</div>
                                </div>
                            </Link>
                            <Link href="/team">
                                <div className="flex items-center">
                                    {/* <IconBorderSides size={30} className="text-slate-800" /> */}
                                    <div className="mt-1 ml-1">Docs</div>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex">
                                <Link href="/sign-in">
                                    {user ? (
                                        <>
                                            <UserAvatar />
                                        </>
                                    ) : (
                                        <Button className="flex font-medium text-base rounded-full mt-2  px-5 py-2.5 mb-2 bg-green-500 hover:bg-green-500">
                                            <div className=" mt-0">Login</div>
                                        </Button>
                                    )}
                                </Link>
                            </div>
                            {/* <ModeToggle /> */}
                        </div>
                    </div>
                ) : null}

                <div className="lg:hidden">
                    <button onClick={toggleNavbar} aria-label="Toggle Menu">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    <Link href="/">
                        <div className="flex items-center">
                            <div className="mt-1 ml-1">Features</div>
                        </div>
                    </Link>
                    <Link href="/team">
                        <div className="flex items-center">
                            <div className="mt-1 ml-1">About Us</div>
                        </div>
                    </Link>
                    <Link href="/team">
                        <div className="flex items-center">
                            <div className="mt-1 ml-1">Docs</div>
                        </div>
                    </Link>

                </div>
                <div className="hidden lg:flex items-center space-x-2">
                    <div>
                        <Link href="/sign-in">
                            {/* <User size={20} /> */}
                            {user ? (
                                <>
                                    <UserAvatar />
                                </>
                            ) : (
                                <Button className="flex font-medium text-base rounded-full mt-2  px-5 py-2.5 mb-2 bg-green-500 hover:bg-green-400">
                                    <div className=" mt-0">Login</div>
                                </Button>
                            )}
                        </Link>
                    </div>
                    {/* <ModeToggle /> */}
                </div>
            </nav>
        </header>
    );
};

export default Header;