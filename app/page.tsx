"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { PlusIcon, SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BackgroundAnimation from "@/components/background-animation"
import ChatMessage from "@/components/chat-message"

export default function ChatPage() {
  const [chatSessions, setChatSessions] = useState([{ id: "1", messages: [] }])
  const [activeChatId, setActiveChatId] = useState("1")

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    id: activeChatId,
  })

  const createNewChat = () => {
    const newChatId = Date.now().toString()
    setChatSessions([...chatSessions, { id: newChatId, messages: [] }])
    setActiveChatId(newChatId)
  }

  return (
    <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
      <BackgroundAnimation />

      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={createNewChat}
          variant="outline"
          size="icon"
          className="rounded-full bg-gray-800 hover:bg-gray-700 border-gray-700"
        >
          <PlusIcon className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 z-10 mt-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 my-12">
              <h1 className="text-2xl font-bold mb-2">Welcome to Mistral Chatbot</h1>
              <p>Start a conversation by typing a message below</p>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-800 z-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="bg-gray-800 border-gray-700 text-white"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

