import React, { useState } from "react";
import { Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyButton = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <button
            onClick={handleCopy}
            className="ml-2 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600"
        >
            {copied ? "Copied!" : "Copy"}
        </button>
    );
};

export const MessageComponent = ({
    message,
    isBot = false,
    user = null
}) => {
    const nameShorter = (name) => {
        const namePart = name.split(" ");
        const firstChar = namePart[0]?.charAt(0).toUpperCase() || "";
        const lastChar = namePart[1]?.charAt(0).toUpperCase() || "";
        return firstChar + lastChar;
    };

    const shortName = user?.name ? nameShorter(user.name) : "";

    return (
        <div
            className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
        >
            {isBot && (
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                </div>
            )}

            <div
                className={`max-w-[70%] rounded-lg p-4 ${isBot
                    ? "bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl text-gray-100"
                    : "bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a] shadow-2xl text-white"
                    }`}
            >
                {isBot ? (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p({ children }) {
                                if (
                                    typeof children[0] === "string" &&
                                    children[0].startsWith("<think>")
                                ) {
                                    return (
                                        <p>
                                            <strong>Thought: </strong>
                                            {children[0].replace("<think>", "")}
                                        </p>
                                    );
                                }
                                return <p>{children}</p>;
                            },
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <div className="relative">
                                        <SyntaxHighlighter
                                            style={oneDark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                        <div className="absolute top-2 right-2">
                                            <CopyButton code={String(children)} />
                                        </div>
                                    </div>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                )}

                <div className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                </div>
            </div>

            {!isBot && (
                <Avatar className="h-9 w-9">
                    <AvatarImage
                        src={user?.photoURL || ""}
                        alt={user?.displayName || "User"}
                        referrerPolicy="no-referrer"
                    />
                    <AvatarFallback>{shortName}</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
};