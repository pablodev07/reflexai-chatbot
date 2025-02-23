import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path'

type Conversation = {
  sender: string;
  text: string;
  timestamp: string;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  try {
    const newConversation: Conversation[] = req.body;
    const filePath = path.join(process.cwd(), 'data', 'chat_history.json');
  
    let existingChatHistory: Conversation[][] = [];
    try {
      const existingData = await fs.readFile(filePath, 'utf-8');
      existingChatHistory = JSON.parse(existingData);
    } catch (error) {
      if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        existingChatHistory = [];
      } else {
        console.error('Error reading chat history:', error);
        return res.status(500).json({ error: 'Failed to read chat history' });
      }
    }
  
    existingChatHistory.push(newConversation);
  
    const updatedData = JSON.stringify(existingChatHistory, null, 2);
    await fs.writeFile(filePath, updatedData);
  
    res.status(200).json({ message: 'Chat history saved successfully' });
  } catch (error) {
    console.error('Error saving chat history:', error);
    res.status(500).json({ error: 'Failed to save chat history' });
  }
  }