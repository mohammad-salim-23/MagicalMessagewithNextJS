/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import {
  Card,
  CardContent,
 
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Message } from "@/model/User";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast.success(response?.data?.message || "Message deleted");
      onMessageDelete(String(message._id));
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  return (
    <Card className="relative p-4 shadow-sm">
      {/* Delete Button Top Right */}
      <div className="absolute top-2 right-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive">
              <X className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <p className="text-sm text-gray-500">
                This action cannot be undone. The message will be permanently deleted.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Message Content */}
      <CardContent>
        <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
      </CardContent>
    </Card>
  );
};
