"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { Send, Sparkles } from "lucide-react";

interface PageProps {
  params: {
    username: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { username } = params;
  const [content, setContent] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleSendMessage = async () => {
    try {
      if (!content.trim()) {
        toast.error("Please enter a message.");
        return;
      }

      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content,
      });

      if (response?.data?.success) {
        toast.success("Message sent successfully");
        setContent(""); // clear input field
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || "Failed to send message");
    }
  };

  const handleSuggestMessage = async () => {
    try {
      setLoadingSuggestions(true);
      const response = await axios.post("/api/suggest-messages");
      const data = await response.data;

      if (typeof data === "string") {
        const parts = data.split("||").map((q) => q.trim());
        setSuggestions(parts);
        toast.success("Suggestions generated");
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;
      toast.error(errorMessage || "Failed to fetch suggestions");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setContent(text);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center text-teal-700">
        Send a Message to @{username}
      </h2>

      {/* Suggestion Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSuggestMessage}
          className="flex items-center gap-2 text-sm text-teal-700 border border-teal-600 px-3 py-1 rounded hover:bg-teal-50 transition cursor-pointer"
          disabled={loadingSuggestions}
        >
          <Sparkles className="w-4 h-4" />
          {loadingSuggestions ? "Loading..." : "Suggest Message"}
        </button>
      </div>

      {/* Textarea and Send Button */}
      <div className="border border-gray-300 rounded-2xl p-4 shadow-md bg-white">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your anonymous message here..."
          className="w-full resize-none border-none outline-none focus:ring-0 min-h-[120px] text-gray-700"
        />

        <button
          onClick={handleSendMessage}
          className="mt-4 flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 transition cursor-pointer"
        >
          <Send className="w-5 h-5" />
          Send Message
        </button>
      </div>

      {/* Show Suggested Messages */}
      {suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Suggestions:</h3>
          <ul className="space-y-2">
            {suggestions.map((q, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(q)}
                className="bg-gray-100 hover:bg-gray-200 transition cursor-pointer p-3 rounded-lg text-gray-800"
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
