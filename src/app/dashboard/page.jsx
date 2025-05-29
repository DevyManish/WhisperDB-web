"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Dashboard() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-[#fcfcfc] p-8">
            <Card className="w-full max-w-2xl mx-auto bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white text-center">Welcome to Dashboard! 🎉</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[#a0a0a0] text-center">
                        Your account has been successfully created and you're now logged in.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
