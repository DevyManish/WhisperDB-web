"use client"
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ChatbotInterface } from '@/components/dashboard/ChatbotInterface';

const Index = () => {
    const [activeTab, setActiveTab] = useState('home');

    const renderContent = () => {
        switch (activeTab) {
            case 'chatbot':
                return <ChatbotInterface />;
            case 'home':
                return (
                    <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                        <div className="text-center text-white relative z-30">
                            <h1 className="text-4xl font-bold mb-4">Welcome to WhisperDB</h1>
                            <p className="text-xl text-gray-400">Powerful Database tool supercharged by AI</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-[#fcfcfc] p-8 overflow-hidden">
                        <div className="text-center text-white">
                            <h1 className="text-4xl font-bold mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                            <p className="text-xl text-gray-400">Feature coming soon!</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] text-[#fcfcfc] overflow-hidden">
            <div className="absolute h-full w-full flex items-center justify-center z-20 pointer-events-none">
                <div className="w-full max-w-3xl">
                    <div className="inset-0 h-48 w-48 bg-[#3CFFA5] rounded-full blur-[100px] z-0 top-0 pointer-events-none" />
                </div>
            </div>
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            {renderContent()}
        </div>
    );
};

export default Index;