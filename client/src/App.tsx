import { useState } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Youtube, Gamepad2, Eye } from "lucide-react";

import AnimatedBackground from "@/components/AnimatedBackground";
import ClockDisplay from "@/components/ClockDisplay";
import Home from "@/pages/Home";
import YouTube from "@/pages/YouTube";
import Games from "@/pages/Games";
import NotFound from "@/pages/not-found";

function Router() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      case 'youtube':
        return <YouTube />;
      case 'games':
        return <Games />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <ClockDisplay />
      
      {/* App Logo */}
      <div className="fixed top-4 left-4 z-50">
        <div className="glass rounded-full w-16 h-16 flex items-center justify-center floating">
          <Eye className="text-2xl text-purple-400" />
        </div>
      </div>

      {/* Navigation */}
      {currentPage !== 'home' && (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="glass rounded-2xl p-4 floating">
            <div className="flex space-x-2">
              <Button 
                onClick={() => navigateTo('home')} 
                variant={currentPage === 'home' ? 'default' : 'outline'}
                className="text-sm"
              >
                ホーム
              </Button>
              <Button 
                onClick={() => navigateTo('youtube')} 
                variant={currentPage === 'youtube' ? 'default' : 'outline'}
                className="bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                <Youtube className="mr-2 h-4 w-4" />YouTube
              </Button>
              <Button 
                onClick={() => navigateTo('games')} 
                variant={currentPage === 'games' ? 'default' : 'outline'}
                className="bg-green-600 hover:bg-green-700 text-white text-sm"
              >
                <Gamepad2 className="mr-2 h-4 w-4" />ゲーム
              </Button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        {renderPage()}
      </div>

      {/* Copyright Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 z-40">
        <div className="glass rounded-lg p-3 text-center text-sm">
          <div className="mb-2">© 2025 RGグループ. All rights reserved.</div>
          <div className="text-xs text-gray-300">
            <strong>グループメンバー：</strong>リーダー：みかんねこ10、副リーダー：りんご<br />
            <strong>活動内容：</strong>アプリなどを作成し、勉強に使えるもの、便利なものなどを作っています<br />
            <strong>マーク：</strong>@RG/
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
