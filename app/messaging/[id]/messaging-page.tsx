"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    sender: "user",
    content: "Hello! I'm interested in the Head Chef position.",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "other",
    content:
      "Hi there! Thanks for your interest. Do you have any specific questions about the role?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    sender: "user",
    content: "Yes, I was wondering about the kitchen equipment and team size.",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    sender: "other",
    content:
      "We have a state-of-the-art kitchen with the latest equipment. The team consists of 15 skilled professionals.",
    timestamp: "10:38 AM",
  },
];

export default function MessagingPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Scroll to bottom of message list
    const messageList = document.getElementById("message-list");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="bg-orange-600 text-white p-4 flex items-center">
          <Link href="/view-applications" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={`https://i.pravatar.cc/150?u=${params.id}`}
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">
              Chat with User {params.id}
            </h1>
            <p className="text-sm opacity-75">Head Chef Position</p>
          </div>
        </div>

        <div
          id="message-list"
          className="h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow"
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
