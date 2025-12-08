/**
 * SehatSetu AI Assistant Component with Gemini API Integration
 */

"use client";

import { Button } from "@/components/ui/button";
import { downloadReport, generateDistrictReport } from "@/services/aiService";
import { GoogleMapsDistrictData } from "@/services/mock/googleMapsMockData";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, Loader2, MessageCircle, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface AIAssistantProps {
  selectedDistrict?: GoogleMapsDistrictData | null;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ selectedDistrict }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hello! I'm SehatSetu AI Assistant. I can help analyze worker data, flag health risks, or generate detailed reports. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";

      if (userMessage.toLowerCase().includes("report") || userMessage.toLowerCase().includes("generate")) {
        if (selectedDistrict) {
          response = `I'll generate a comprehensive report for ${selectedDistrict.name} district. This will include worker demographics, health metrics, and recommendations.`;
        } else {
          response = "Please select a district from the map to generate a detailed report.";
        }
      } else if (userMessage.toLowerCase().includes("health") || userMessage.toLowerCase().includes("risk")) {
        response = selectedDistrict
          ? `Based on the data for ${selectedDistrict.name}, health check coverage is ${selectedDistrict.healthMetrics.healthCheckRate}% with ${selectedDistrict.healthMetrics.activeCases} active disease cases. ${selectedDistrict.healthMetrics.activeCases > 200 ? "⚠️ High risk - immediate attention recommended." : "Status is manageable."}`
          : "Please select a district to analyze health risks.";
      } else {
        response = "I can help you with:\n• Generate detailed district reports\n• Analyze health risks and trends\n• Provide worker demographic insights\n• Answer questions about specific districts\n\nSelect a district on the map or ask me a question!";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsGenerating(false);
    }, 1000);
  };

  const handleGenerateReport = async () => {
    if (!selectedDistrict || isGenerating) return;

    setIsGenerating(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `Generate a detailed report for ${selectedDistrict.name}` },
      { role: "assistant", content: "Generating comprehensive report... This may take a moment." },
    ]);

    try {
      const report = await generateDistrictReport(selectedDistrict);
      setGeneratedReport(report);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `✅ Report generated successfully for ${selectedDistrict.name}!\n\nYou can now download it using the download button.`,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error generating report. Please try again." },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = () => {
    if (generatedReport && selectedDistrict) {
      downloadReport(generatedReport, selectedDistrict.name);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
          rotate: isOpen ? 90 : 0,
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 0.3,
          },
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-40"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            {/* Animated Header */}
            <motion.div
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30 text-xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🤖
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-sm">SehatSetu AI Assistant</h3>
                  <motion.div
                    className="flex items-center gap-1.5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <p className="text-xs text-blue-100">Analyzing data in real-time</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white min-h-[200px] max-h-[300px]">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 text-xs flex-shrink-0 shadow-sm">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-sm max-w-[80%] ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white border border-slate-200 shadow-sm text-slate-600 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0 shadow-sm">
                      You
                    </div>
                  )}
                </motion.div>
              ))}
              {isGenerating && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 text-xs flex-shrink-0 shadow-sm">
                    AI
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
              <Button
                onClick={handleGenerateReport}
                disabled={!selectedDistrict || isGenerating}
                size="sm"
                className="flex-shrink-0 text-xs"
                variant="outline"
              >
                <FileText className="w-3 h-3 mr-1" />
                Generate Report
              </Button>
              {generatedReport && selectedDistrict && (
                <Button
                  onClick={handleDownloadReport}
                  size="sm"
                  className="flex-shrink-0 text-xs"
                  variant="outline"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about worker health trends..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                disabled={isGenerating}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isGenerating}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;

