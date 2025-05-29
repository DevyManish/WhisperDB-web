"use client"
import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Groq from "groq-sdk";
import { useAuth } from "@/context/AuthContext";
import { MessageComponent } from "./MessageComponent";

const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
})

export const ChatbotInterface = () => {
    const { user } = useAuth();

    const [messages, setMessages] = useState([
        {
            id: "1",
            content: "Hello 👋🏼, how can I assist you today?",
            role: "assistant",
            timestamp: new Date()
        }
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollAreaRef = useRef(null)

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector(
                "[data-radix-scroll-area-viewport]"
            )
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return

        const userMessage = {
            id: Date.now().toString(),
            content: inputMessage,
            role: "user",
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputMessage("")
        setIsLoading(true)

        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an advanced SQL generation assistant. Only respond to database-related prompts such as generating SQL queries, modifying schemas, understanding columns, or handling SQL errors. You must not answer any questions outside SQL and database operations. If the input is not clearly related to SQL or database context, respond with: 'I can only assist with SQL and database-related queries' nothing else apart from this. Ignore or politely reject any off-topic, conversational, or personal questions. Always keep responses brief, technical, and focused. Do not explain why you're rejecting off-topic inputs—just clearly state your scope."
                    },
                    ...messages.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    {
                        role: "user",
                        content: inputMessage
                    }
                ],
                model: "deepseek-r1-distill-llama-70b",
                temperature: 0.7,
                max_tokens: 1000
            })

            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                content:
                    response.choices[0]?.message?.content ||
                    "Sorry, I couldn't generate a response.",
                role: "assistant",
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            console.error("Error calling Groq API:", error)
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                content:
                    "Sorry, there was an error processing your request. Please try again.",
                role: "assistant",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const clearChat = () => {
        setMessages([
            {
                id: "1",
                content: "Hello! I'm your AI assistant powered by DeepSeek. How can I help you today?",
                role: "assistant",
                timestamp: new Date()
            }
        ])
    }

    return (
        <div className="flex-1 flex flex-col p-8 h-screen min-h-0">
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">SQLBot</h1>
                        <p className="text-gray-400 mt-1">
                            Powered by DeepSeek R1 Distill Llama 70B
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={clearChat}
                        className="bg-[#1a1a1a]/80 backdrop-blur-xl border-[#2a2a2a] shadow-2xl text-white hover:bg-[#1a1a1a]/40 hover:text-slate-200"
                    >
                        Clear Chat
                    </Button>
                </div>
            </div>

            <div className="flex-1 p-6 min-h-0">
                <ScrollArea ref={scrollAreaRef} className="h-full">
                    <div className="space-y-4 px-6">
                        {messages.map(message => (
                            <MessageComponent
                                key={message.id}
                                message={message}
                                isBot={message.role === "assistant"}
                                user={user}
                            />
                        ))}
                        {/* sipnner animation */}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-gray-800 text-gray-100 rounded-lg p-4">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.1s" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            <div className="p-6 border-t border-gray-800">
                <div className="flex gap-4">
                    <Textarea
                        value={inputMessage}
                        onChange={e => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message here... (Press Enter to send)"
                        className="flex-1 bg-[#1a1a1a]/80 backdrop-blur-xl border-[#2a2a2a] shadow-2xl text-white placeholder:text-gray-500 resize-none min-h-[60px] max-h-[120px]"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 self-end"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}