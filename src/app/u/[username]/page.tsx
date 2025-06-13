"use client";
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Send } from 'lucide-react'; // Optional: If you want to use an icon

interface PageProps {
  params: {
    username: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { username } = params;
  const [content, setContent] = useState("");

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

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Send a Message to @{username}
      </h2>

      <div className="border border-gray-300 rounded-2xl p-4 shadow-md bg-white">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your anonymous message here..."
          className="w-full resize-none border-none outline-none focus:ring-0 min-h-[120px] text-gray-700"
        />

        <button
          onClick={handleSendMessage}
          className="mt-4 flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-2 rounded-xl hover:bg-teal-700 transition"
        >
          <Send className="w-5 h-5 cursor-pointer" />
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Page;
