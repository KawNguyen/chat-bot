import { MessageCircleMore } from "lucide-react";
import { Button } from "../ui/button";

interface ChatBoxButtonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChatBoxButton = ({ open, setOpen }: ChatBoxButtonProps) => {
  return (
    <Button
      onClick={() => setOpen(!open)}
      variant={"outline"}
      size={"icon"}
      className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-shadow relative z-20"
    >
      <MessageCircleMore />
    </Button>
  );
};

export default ChatBoxButton;
