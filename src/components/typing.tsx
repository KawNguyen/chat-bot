interface TypingIndicatorProps {
  className?: string
}

export function TypingIndicator({ className = "" }: TypingIndicatorProps) {
  return (
    <div className={`flex justify-start ${className}`}>
      <div className="bg-muted rounded-2xl px-4 py-2">
        <div className="flex space-x-1 items-center">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  )
}