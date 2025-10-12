import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "./ChatInterface";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          <ChatInterface onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 h-14 w-14 rounded-full shadow-lg z-40"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </>
  );
};

export default ChatWidget;
