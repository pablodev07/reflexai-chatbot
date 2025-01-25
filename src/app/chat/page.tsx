'use client'
import { useState } from "react";
import { GoHome, GoPerson, GoBell } from "react-icons/go";

export default function ChatDashboard() {
  interface Message{
    text: string
  }

  const [messages, setMessages] = useState<Message[]>([]);


  const handleSubmit = (e) =>{
    e.preventDefault();
    setMessages([
      ...messages,
      { text: 'Hello'}
    ]);
  }
  return (
    <main className="chatContainer flex flex-col lg:flex-row h-screen">
      <nav className="border-r-2 border-solid border-gray-200 w-full lg:w-[10%]">
        <div className="admIcons flex flex-row lg:flex-col pt-5 pb-5 lg:pb-0 gap-7">
          <a className="mx-auto" href="/"><button>
            <GoHome className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Go to Home" />
          </button>
          </a>
          <button className="mx-auto">
            <GoPerson className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="User settings" />
          </button>
          <button className="mx-auto">
            <GoBell className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Notifications" />
          </button>
        </div>

      </nav>
      <section className="relative flex flex-1 flex-col overflow-hidden bg-smoothgray">
        <div className="headlineChat border-b-2 border-solid border-gray-200"><h1 className="pl-5 py-7 text-dark text-3xl font-bold">Chatbot</h1></div>
        <div className="conversationContainer flex flex-1 h-full overflow-y-auto">
          {messages.map((message, index) =>(
            <div key={index}>{message.text}</div>
          ))}
        </div>
        <form className="inputContainer sticky bottom-0 mx-5 mb-5" onSubmit={handleSubmit}>
          <textarea className="chatInput w-full rounded-[24px] min-h-[100px] p-5 border-2 border-gray-200 outline-primary overflow-y-auto resize-none" placeholder="Enter your message" />
          <button type="submit" className="absolute bottom-0 rounded-[24px] right-0 py-[0.575rem] lg:py-[0.875rem] px-[1.5625rem] h-[50px] mb-5 mr-4 bg-primary font-bold">Send</button>
        </form>
      </section>
    </main>
  );
}
