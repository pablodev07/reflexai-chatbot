'use client'
import { useState, useEffect } from 'react';

export default function AdminPanel() {
    const [chatLogs, setChatLogs] = useState<any[]>([]);
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

    if (loading) {
        return <div>Loading chat logs...</div>
    }

    if (error){
        return <div>{error}</div>
    }

    return(
        <main>
            <h1>Chat Logs</h1>
            {chatLogs.length === 0 ? (
                <p>No conversations found.</p>
            ) : (
                <ul>
                    {chatLogs.map((conversation, index) => (
                        <li key={index}>
                            <h2>Conversation {index + 1}</h2>
                            <pre>{JSON.stringify(conversation, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}