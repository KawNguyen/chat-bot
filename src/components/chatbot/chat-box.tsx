import { BotMessageSquare, Send, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { TypingIndicator } from "../typing";

interface ChatBoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}



const ChatBox = ({ open, setOpen }: ChatBoxProps) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      sender: "bot",
      text: "Hãy hỏi bất kỳ điều gì về sản phẩm của chúng tôi!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    // Giả lập gọi API trả lời bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: `Bot trả lời: ${userMsg.text}`,
        },
      ]);
      setLoading(false);
    }, 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return open ? (
    <Card
      className="w-100 h-120 p-0 overflow-hidden flex-col gap-0 ease-in-out transition-all duration-300 shadow-2xl border"
      style={{ transformOrigin: "bottom right" }}
    >
      <CardHeader className="bg-green-200 py-3 h-20 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="p-2 rounded-full bg-white">
            <BotMessageSquare className="text-green-600" />
          </div>
          <span className="font-bold">Trợ Lý AI Cửa Hàng</span>
        </div>
        <CardAction>
          <Button variant="link" onClick={() => setOpen(false)}>
            <X />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="flex flex-col gap-2 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.sender === "user"
                    ? "self-end max-w-[70%] bg-green-100 text-right rounded-lg px-3 py-2 shadow"
                    : "self-start max-w-[70%] bg-white rounded-lg px-3 py-2 shadow border"
                }
              >
                {msg.text}
              </div>
            ))}
            {loading && <TypingIndicator />}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="py-3 gap-2 justify-end h-20 border-t-1">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          className="flex-1"
          disabled={loading}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={loading || !inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ) : null;
};

export default ChatBox;
