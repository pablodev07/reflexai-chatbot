'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { GoHome, GoBell, GoAlertFill, GoComment, GoCommentDiscussion } from "react-icons/go";

type Message = {
    sender: string;
    text: string;
    timestamp: string;
  };
  
  type Conversation = {
    [key: string]: Message;
  };


export default function AdminPanel() {
    const [chatLogs, setChatLogs] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChatLogs = async () => {
            try {
                const res = await fetch('/api/getChatLogs')
                if (!res.ok){
                    throw new Error(`Error fetching chat logs: ${res.status}`)
                }
                const data = await res.json();
                setChatLogs(data);
            } catch (err){
                console.error("Error fetching chat logs:", err);
                setError("Error fetching chat logs. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchChatLogs();
    }, [])


    if (error){
        return <div>{error}</div>
    }

    return (
        <main className="chatContainer flex flex-col lg:flex-row h-screen">
          <nav className="border-r-2 border-solid border-gray-200 w-full lg:w-[10%]">
            <div className="admIcons flex flex-row lg:flex-col pt-3 pb-3 lg:pb-0">
              <Link className="mx-auto p-5" href="/"><button>
                <GoHome className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Go to Home" />
              </button>
              </Link>
              <Link className="mx-auto p-5" href="/chat">
                <button>
                  <GoComment className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Go to Chat" />
                </button>
              </Link>
                <button className="mx-auto p-5">
                  <GoBell className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Notifications" />
                </button>
            </div>
    
          </nav>
          <section className="relative flex flex-1 flex-col overflow-hidden bg-smoothgray">
            <div className="headlineChat border-b-2 border-solid border-gray-200"><h1 className="pl-5 py-7 text-dark text-3xl font-bold">Admin Panel</h1></div>
            {loading && (
                <h2 className="pl-5 py-7 text-dark text-xl font-bold">Loading chat logs, please wait...</h2>
            )}
            <div className="conversationLogContainer flex flex-1 flex-col gap-5 h-full overflow-y-auto p-5">
            {chatLogs.length === 0 && !loading ? (
                <div className="flex bg-tertiary rounded p-5 w-full md:w-fit"><GoAlertFill className="text-dark text-xl mr-4"/> <p>No conversations found.</p></div>
            ) : (
                <div className="cardContainer flex flex-wrap justify-evenly gap-y-5">
                    {chatLogs.map((conversation, index) => (
                        <div className="card rounded-[24px] bg-white w-fit p-5" key={index}>
                            <div className="headlineChat flex justify-between">
                            <h2 className="font-bold text-xl">Conversation #{index + 1}</h2>
                            <GoCommentDiscussion className="text-primary text-4xl"/>
                            </div>
                            <div className="border-t border-gray my-3"/>
                            <ul>
                            {Object.keys(conversation).map((item, indice) => {
                                return (  
                                        <li key={indice} className="mb-5">
                                            <div className="flex justify-between">
                                                <p className="font-bold capitalize">{conversation[item].sender}</p>
                                                <p className="text-xs text-gray-300">{conversation[item].timestamp} </p>
                                            </div>
                                        <p>{conversation[item].text}</p></li>
                                )
                            })
                        }</ul>
                        </div>
                    ))}
                </div>
            )}
            </div>
          </section>
        </main>
      );
}