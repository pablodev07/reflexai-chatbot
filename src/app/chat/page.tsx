"use client";
import React, { useState, useEffect, useRef } from "react";
import { VscSend } from "react-icons/vsc";
import { GoHome, GoTable, GoBell } from "react-icons/go";
import Link from "next/link";

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

function ChatDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isConversationActive, setIsConversationActive] = useState(true);
  const conversationContainerRef = useRef<HTMLDivElement>(null);

  const chatbotResponses = [
    "Hello! I am here to help you. What's troubling you today?",
    "Oh I see. And then what happened?",
    "How so?",
    "And how did you react?"
  ];

  const [currentResponseIndex, setCurrentResponseIndex] = useState(0)

  useEffect(() => {
    if (conversationContainerRef.current) {
      conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(!messageLoading){
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (userInput.trim() === '') return;

    const timestamp = new Date().toISOString();
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput, timestamp },
    ]);

    const chatbotResponse = chatbotResponses[currentResponseIndex]

    setMessageLoading(true);
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          { sender: 'bot', text: chatbotResponse, timestamp: new Date().toISOString() },
        ]
        const nextIndex = (currentResponseIndex + 1) % chatbotResponses.length;
        setCurrentResponseIndex(nextIndex)
        return updatedMessages;
      })

      setMessageLoading(false);
    }, 1500);

    setUserInput('');
  };

  const handleCloseChat = () => {
    saveChatHistory(messages).then(() => {
      setMessages([]);
      setIsConversationActive(false);
      setCurrentResponseIndex(0)
    })
  }

  const saveChatHistory = async (messagesToSave: Message[]) => {
    try {
      const response = await fetch('/api/saveChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagesToSave),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  useEffect(() => {
    if (!isConversationActive) {
      const hasSystemMessage = messages.some(
        (message) => message.sender === 'system'
      )
      if (!hasSystemMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'system', text: 'Conversation has been saved.', timestamp: 'now' }
        ])
      }

      const timeoutId = setTimeout(() => {
        setIsConversationActive(true);
        setMessages((prevMessages) => 
        prevMessages.filter((message) => message.sender !== 'system'))
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
  }, [isConversationActive, messages]);

  return(
    
    <main className="chatContainer flex flex-col lg:flex-row h-screen">
      <nav className="border-r-2 border-solid border-gray-200 w-full lg:w-[10%]">
        <div className="admIcons flex flex-row lg:flex-col pt-3 pb-3 lg:pb-0">
          <Link className="mx-auto p-5" href="/"><button>
            <GoHome className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Go to Home" />
          </button>
          </Link>
          <Link className="mx-auto p-5" href="/admin">
            <button>
              <GoTable className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Admin Panel" />
            </button>
          </Link>
            <button className="mx-auto p-5">
              <GoBell className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Notifications" />
            </button>
        </div>

      </nav>
      <section className="relative flex flex-1 flex-col overflow-hidden bg-smoothgray">
        <div className="headlineChat border-b-2 border-solid border-gray-200 pl-5 pr-5 xl:pr-0"><h1 className="py-7 text-dark text-3xl font-bold">Chatbot</h1>
          <button className="w-full lg:w-[20rem] rounded-[24px] py-[0.575rem] px-[1.5625rem] font-bold transition ease-in-out border-2 bg-transparent text-primary border-primary mb-5 disabled:text-gray-500 disabled:border-gray-500" name="Close and save chat" disabled={messageLoading} onClick={handleCloseChat}>
            Close and save chat
          </button>
        </div>
        <div ref={conversationContainerRef} className="conversationContainer flex flex-1 flex-col gap-5 h-full overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={index} data-testid="message-container" className={` rounded-[24px] h-fit p-5 message-${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}
          {messageLoading && (
            <div className="rounded-[24px] bg-dark text-white h-fit p-5 ml-auto">
              <div className="nowTypingMessage">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          )}
        </div>
        <div className="inputContainer sticky bottom-0 mt-4 mx-5 mb-5">
          <textarea data-testid="user-input" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyDown} className="chatInput w-full rounded-[24px] min-h-[100px] p-5 border-2 border-gray-200 outline-primary overflow-y-auto resize-none" placeholder="Enter your message...." aria-label="Enter your message here." />
          <button data-testid="send-msg" type="submit" disabled={messageLoading} aria-label="Submit your message" className="absolute bottom-0 rounded-[24px] right-0 py-[0.575rem] lg:py-[0.875rem] px-[1.5625rem] h-[50px] mb-5 mr-4 bg-primary font-bold text-white disabled:bg-smoothgray disabled:border-primary disabled:border-2 disabled:text-gray-500" onClick={handleSubmit}><VscSend className="w-[25px] h-[25px]" /></button>
        </div>
      </section>
    </main>
  );
}

export default ChatDashboard;