"use client";
import { useRef, useState, useEffect } from "react";import { GoHome, GoPerson, GoBell } from "react-icons/go";
import { VscSend } from "react-icons/vsc";

export default function ChatDashboard() {
interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

const chatbotResponses = [
  "Hello! I am here to help you. What's troubling you today?",
  "Oh I see. And then what happened?",
  "How so?",
  "And how did you react?",
];

const [messages, setMessages] = useState<Message[]>([]);
const [messageLoading, setMessageLoading] = useState(false);
const [userInput, setUserInput] = useState('');
const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
const conversationContainerRef = useRef<HTMLDivElement>(null);
const chatTimeoutRef = useRef<NodeJS.Timeout | null>(null); 

useEffect(() => {
  startChatTimeout();

  return () => {
    clearTimeout(chatTimeoutRef.current);
  };
}, []);

useEffect(() => {
  if (conversationContainerRef.current) {
    conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
  }
}, [messages]);

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
};

  const handleSubmit = async () => {
    const timestamp = new Date().toISOString();
    if (userInput.trim() === '') return; //to ignore empty messages

    setMessages([
      ...messages,
      { sender: 'user', text: userInput, timestamp }
    ]);
    setMessageLoading(true)

    setTimeout(() => {
      const chatbotResponse = chatbotResponses[currentResponseIndex]
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: chatbotResponse, timestamp }
      ]);
      setCurrentResponseIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < chatbotResponses.length ? nextIndex : 0
      })
      setMessageLoading(false)
    }, 700)

    setUserInput('')

    if(chatTimeoutRef.current){
      clearTimeout(chatTimeoutRef.current)
    }
    startChatTimeout()

  }

  const saveChatHistory = async () => {
    try {
      const response = await fetch('/api/saveChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages)
      })

      if(!response.ok){
        throw new Error(`Error. ${response.status}`)
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error saving chat history:', error)
    }
  }

  const startChatTimeout = async () => {
    debugger;
    const timeout = setTimeout(async () => {
      setMessages((prevMessages) =>[
        ...prevMessages,
        {sender: 'system', text: 'This chat will be closed in a few moments.', timestamp: 'timeStamp'}
      ])

    setTimeout(async () => {
      await saveChatHistory();

      setMessages([])
      setCurrentResponseIndex(0)
    }, 5000)
  }, 6000)

  chatTimeoutRef.current = timeout; //store the timeout ID
}

useEffect(() => {
  startChatTimeout();
  return () =>{
    if (chatTimeoutRef.current){
      clearTimeout(chatTimeoutRef.current);
    }
  }
}, [])
  return (
    <main className="chatContainer flex flex-col lg:flex-row h-screen">
      <nav className="border-r-2 border-solid border-gray-200 w-full lg:w-[10%]">
        <div className="admIcons flex flex-row lg:flex-col pt-3 pb-3 lg:pb-0">
          <a className="mx-auto p-5" href="/"><button>
            <GoHome className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Go to Home" />
          </button>
          </a>
          <a className="mx-auto p-5" href="/admin">
            <button>
              <GoPerson className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Admin Panel" />
            </button>
          </a>
          <a className="mx-auto p-5" href="/">
            <button>
              <GoBell className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Notifications" />
            </button>
          </a>
        </div>

      </nav>
      <section className="relative flex flex-1 flex-col overflow-hidden bg-smoothgray">
        <div className="headlineChat border-b-2 border-solid border-gray-200"><h1 className="pl-5 py-7 text-dark text-3xl font-bold">Chatbot</h1></div>
        <div ref={conversationContainerRef} className="conversationContainer flex flex-1 flex-col gap-5 h-full overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={index} className={`rounded-[24px] h-fit p-5 message-${message.sender}`}>
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
          <textarea ref={textAreaRef} value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyDown} className="chatInput w-full rounded-[24px] min-h-[100px] p-5 border-2 border-gray-200 outline-primary overflow-y-auto resize-none" placeholder="Enter your message" />
          <button type="submit" aria-label="Submit your message" className="absolute bottom-0 rounded-[24px] right-0 py-[0.575rem] lg:py-[0.875rem] px-[1.5625rem] h-[50px] mb-5 mr-4 bg-primary font-bold text-white" onClick={handleSubmit}><VscSend className="w-[25px] h-[25px]" /></button>
        </div>
      </section>
    </main>
  );
}
