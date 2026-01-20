'use client';

import { useChat } from '@ai-sdk/react';
import { useChatStore } from '@/lib/store/chat-store';
import { ModelSelector } from '@/components/chat/model-selector';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizontal } from 'lucide-react';
import * as React from 'react';
import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const { selectedModel, setSelectedModel } = useChatStore();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: { model: selectedModel }
  } as any) as any;
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4 relative">
      <header className="flex justify-between items-center py-4 border-b mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Gemini Clone</h1>
        <ModelSelector value={selectedModel} onValueChange={setSelectedModel} />
      </header>

      <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollRef}>
         {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
                <p className="text-4xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Hello, Human.</p>
                <p className="">How can I help you today?</p>
            </div>
         )}
        <div className="space-y-6 pb-20">
          {messages.map((m: any) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-muted/50 text-foreground border'
                }`}
              >
                <div className={`prose ${m.role === 'user' ? 'prose-invert' : 'dark:prose-invert'} max-w-none text-sm leading-relaxed`}>
                 <ReactMarkdown>
                    {m.content}
                 </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
              <div className="flex justify-start">
                  <div className="bg-muted/50 rounded-2xl px-5 py-3 border flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                  </div>
              </div>
          )}
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 bg-background pt-2 pb-6">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative flex items-end w-full p-2 border rounded-xl bg-muted/20 focus-within:ring-2 ring-primary/20 ring-offset-2 transition-all"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="min-h-[50px] w-full resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-3 pr-12 max-h-[200px]"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input}
            className="absolute right-3 bottom-3 rounded-full w-8 h-8"
          >
            <SendHorizontal className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-2">
            Gemini Clone may display inaccurate info, including about people, so double-check its responses.
        </p>
      </div>
    </div>
  );
}
