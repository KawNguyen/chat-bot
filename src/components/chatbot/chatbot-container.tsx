import { useState } from "react";
import ChatBox from "./chat-box";
import ChatBoxButton from "./chat-box-button";

const ChatBotContainer = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      <div className="relative">
        <div className="absolute bottom-16 right-0 z-10">
          <ChatBox open={open} setOpen={setOpen} />
        </div>
        <ChatBoxButton open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default ChatBotContainer;
