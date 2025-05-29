"use client"
import React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useRouter } from "next/navigation"
import { sidebarItems, bottomItems } from "@/utils/data"

export const Sidebar = ({ activeTab, onTabChange }) => {

    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const nameShorter = (name) => {
        const namePart = name.split(" ");
        const firstChar = namePart[0]?.charAt(0).toUpperCase() || "";
        const lastChar = namePart[1]?.charAt(0).toUpperCase() || "";
        return firstChar + lastChar;
    };

    const shortName = user?.name ? nameShorter(user.name) : "";

    return (
        <div className="w-64 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-[#fcfcfc] border-r border-gray-800 flex flex-col h-full">
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center mb-1 space-x-2">
                    <p className=" mt-1  text-xl md:text-3xl font-extrabold bg-gradient-to-r from-green-500 via-green-400 to-green-300 bg-clip-text text-transparent">
                        <Link href="/">WhisperDB</Link>
                    </p>
                </div>

                <div className="mt-3 p-2 bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl rounded-lg">
                    <div className="flex items-center space-x-2 ">
                        <Avatar className="h-9 w-9 ">
                            <AvatarImage
                                src={user?.photoURL || ""}
                                alt={user?.displayName || "User"}
                                referrerPolicy="no-referrer"
                            />
                            <AvatarFallback>{shortName}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="text-sm text-gray-300">{user?.name || "Manish"}</div>
                            <div className="text-xs text-gray-500">{user?.email || "manish@db.com"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4">
                <nav className="space-y-1">
                    {sidebarItems.map(item => {
                        const Icon = item.icon
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={cn(
                                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ",
                                    activeTab === item.id
                                        ? "bg-[#1a1a1a]/80 backdrop-blur-xl border-[#2a2a2a] shadow-2xl text-white"
                                        : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]/80 hover:backdrop-blur-xl hover:border hover:border-[#2a2a2a] hover:shadow-2xl"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-800">
                <div className="mb-4 p-3 bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl rounded-lg">
                    <div className="text-sm text-white font-medium">Free Plan</div>
                    <div className="text-xs text-gray-400 mt-1">
                        Upgrade for more usage and to unlock additional features!
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                        Credits used: <span className="text-white">0 / 10</span>
                    </div>
                    <button className="w-full mt-3 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors">
                        Upgrade Plan ✨
                    </button>
                </div>

                <nav className="space-y-1">
                    {bottomItems.map(item => {
                        const Icon = item.icon
                        return (
                            <button
                                key={item.id}
                                onClick={item.id === "Logout" ? handleLogout : () => onTabChange(item.id)}
                                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-400 hover:text-white hover:bg-[#1a1a1a]/80 hover:backdrop-blur-xl hover:border hover:border-[#2a2a2a] hover:shadow-2xl "
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
