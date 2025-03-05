import type { Message } from "ai"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${isUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"
          }`}
      >
        {message.content}
      </div>
    </div>
  )
}

