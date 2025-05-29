"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GoogleIcon } from "@/components/icons/icons"
import { signInWithPopup } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, googleProvider, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { indianStates, countries } from "@/utils/data";

export default function MultiStepSignup() {
    const [currentStep, setCurrentStep] = useState(1)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        accountType: "individual",
        companyName: "",
        address: {
            street: "",
            city: "",
            pin: "",
            state: "",
            country: "India",
        },
    })
    const router = useRouter()

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true)
            const result = await signInWithPopup(auth, googleProvider)
            const user = {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            };
            login(user, result.user.accessToken);
            const userDoc = await getDoc(doc(db, "users", user.email))
            if (userDoc.exists() && userDoc.data().isCompleted) {
                router.push("/dashboard") // Redirect to dashboard if already completed
                return
            }

            setUser(user)
            setCurrentStep(2)
        } catch (error) {
            console.error("Error signing in with Google:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field, value) => {
        if (field.includes(".")) {
            const [parent, child] = field.split(".")
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }))
        }
    }

    const handleStep2Submit = (e) => {
        e.preventDefault()
        if (!formData.username.trim()) {
            alert("Please enter a username")
            return
        }
        setCurrentStep(3)
    }

    const handleStep3Submit = async (e) => {
        e.preventDefault()
        if (!formData.address.street || !formData.address.city || !formData.address.pin || !formData.address.state) {
            alert("Please fill in all required address fields")
            return
        }

        try {
            setLoading(true)
            const userData = {
                fullname: user.displayName,
                email: user.email,
                username: formData.username,
                accountType: formData.accountType,
                companyName: formData.accountType === "company" ? formData.companyName : null,
                address: formData.address,
                isCompleted: true,
                createdAt: new Date().toISOString(),
            }

            await setDoc(doc(db, "users", user.email), userData)
            router.push("/dashboard") // Redirect to dashboard after completion
        } catch (error) {
            console.error("Error saving user data:", error)
            alert("Error saving data. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const renderStep1 = () => (
        <Card className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl z-10">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold text-white">Welcome! 🎉</CardTitle>
                <CardDescription className="text-[#a0a0a0]">Create your account to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Button
                    variant="outline"
                    className="w-full bg-[#24292e] border-[#3a3a3a] text-white hover:bg-[#2d3339]"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    <GoogleIcon />
                    {loading ? "Signing in..." : "Continue with Google"}
                </Button>
            </CardContent>
        </Card>
    )

    const renderStep2 = () => (
        <Card className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl z-10">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold text-white">Complete Your Profile</CardTitle>
                <CardDescription className="text-[#a0a0a0]">Tell us a bit more about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {user && (
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={user.photoURL || "/placeholder.svg"} alt={user.displayName} />
                            <AvatarFallback className="bg-[#3CFFA5] text-black">{user.displayName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <p className="text-white font-medium">{user.displayName}</p>
                            <p className="text-[#a0a0a0] text-sm">{user.email}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium text-[#e0e0e0]">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-[#707070] focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-[#e0e0e0]">Account Type</Label>
                        <RadioGroup
                            value={formData.accountType}
                            onValueChange={(value) => handleInputChange("accountType", value)}
                            className="flex flex-col space-y-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="individual" id="individual" className="border-[#3a3a3a] text-[#3CFFA5]" />
                                <Label htmlFor="individual" className="text-[#e0e0e0]">
                                    Individual Account
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="company" id="company" className="border-[#3a3a3a] text-[#3CFFA5]" />
                                <Label htmlFor="company" className="text-[#e0e0e0]">
                                    Company Account
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#3CFFA5] to-[#00D4AA] hover:from-[#2ee89a] hover:to-[#00c199] text-black font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    >
                        Continue
                    </Button>
                </form>
            </CardContent>
        </Card>
    )

    const renderStep3 = () => (
        <Card className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl z-10">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold text-white">Address Information</CardTitle>
                <CardDescription className="text-[#a0a0a0]">Complete your profile with address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleStep3Submit} className="space-y-4">
                    {formData.accountType === "company" && (
                        <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-sm font-medium text-[#e0e0e0]">
                                Company Name (Optional)
                            </Label>
                            <Input
                                id="companyName"
                                type="text"
                                placeholder="Enter company name"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange("companyName", e.target.value)}
                                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-[#707070] focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="street" className="text-sm font-medium text-[#e0e0e0]">
                            Street Address *
                        </Label>
                        <Input
                            id="street"
                            type="text"
                            placeholder="Enter street address"
                            value={formData.address.street}
                            onChange={(e) => handleInputChange("address.street", e.target.value)}
                            className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-[#707070] focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-[#e0e0e0]">
                                City/Town *
                            </Label>
                            <Input
                                id="city"
                                type="text"
                                placeholder="City"
                                value={formData.address.city}
                                onChange={(e) => handleInputChange("address.city", e.target.value)}
                                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-[#707070] focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pin" className="text-sm font-medium text-[#e0e0e0]">
                                PIN Code *
                            </Label>
                            <Input
                                id="pin"
                                type="text"
                                placeholder="PIN"
                                value={formData.address.pin}
                                onChange={(e) => handleInputChange("address.pin", e.target.value)}
                                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-[#707070] focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium text-[#e0e0e0]">
                            Country *
                        </Label>
                        <Select
                            value={formData.address.country}
                            onValueChange={(value) => handleInputChange("address.country", value)}
                        >
                            <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                                {countries.map((country) => (
                                    <SelectItem key={country} value={country} className="text-white hover:bg-[#3a3a3a]">
                                        {country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium text-[#e0e0e0]">
                            State *
                        </Label>
                        <Select value={formData.address.state} onValueChange={(value) => handleInputChange("address.state", value)}>
                            <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white focus:border-[#3CFFA5] focus:ring-[#3CFFA5]/20">
                                <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a] max-h-48">
                                {(formData.address.country === "India" ? indianStates : ["Select country first"]).map((state) => (
                                    <SelectItem key={state} value={state} className="text-white hover:bg-[#3a3a3a]">
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#3CFFA5] to-[#00D4AA] hover:from-[#2ee89a] hover:to-[#00c199] text-black font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    >
                        {loading ? "Creating Account..." : "Complete Registration"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-[#fcfcfc] px-4 sm:px-[10%] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute h-full w-full flex items-center justify-center z-20 pointer-events-none">
                <div className="w-full max-w-3xl">
                    <div className="inset-0 h-48 w-48 bg-[#3CFFA5] rounded-full blur-[100px] z-0 top-0 pointer-events-none" />
                </div>
            </div>

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Step indicator */}
            <div className="flex space-x-2 mt-6 z-10">
                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className={`w-3 h-3 rounded-full ${step === currentStep ? "bg-[#3CFFA5]" : step < currentStep ? "bg-[#3CFFA5]/60" : "bg-[#3a3a3a]"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
