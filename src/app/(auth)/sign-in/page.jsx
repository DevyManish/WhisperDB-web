"use client"
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from '@/components/icons/icons';

export default function Page() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-[#fcfcfc] px-4 sm:px-[10%] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute h-full w-full flex items-center justify-center z-20 pointer-events-none">
                <div className="w-full max-w-3xl">
                    <div className="inset-0 h-48 w-48 bg-[#3CFFA5] rounded-full blur-[100px] z-0 top-0 pointer-events-none" />
                </div>
            </div>

            <Card className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl z-10">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold text-white">Welcome back 🎉</CardTitle>
                    <CardDescription className="text-[#a0a0a0]">
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Button
                        variant="outline"
                        className="w-full bg-[#24292e]  border-[#3a3a3a] text-white"
                        onClick={() => console.log("GitHub button clicked")}
                    >
                        <GoogleIcon />
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#2a2a2a]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#1a1a1a] px-2 text-[#707070]">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-[#e0e0e0]">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-[#707070] focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20 transition-all duration-200"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-[#e0e0e0]">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-[#707070] focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20 transition-all duration-200"
                                required
                            />
                        </div>

                        <div className="text-right">
                            <Link href="#" className="text-sm text-[#3CFFA5] hover:text-[#2ee89a] transition-colors duration-200">
                                Forgot your password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#3CFFA5] to-[#00D4AA] hover:from-[#2ee89a] hover:to-[#00c199] text-black font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
                        >
                            Sign in
                        </Button>
                    </form>

                    <div className="text-center text-sm text-[#a0a0a0]">
                        Don't have an account?{' '}
                        <Link href="/sign-up" className="text-[#3CFFA5] hover:text-[#2ee89a] font-medium transition-colors duration-200">
                            Sign up for free
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}