import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const newConversation: any[] = req.body;
            const filePath = path.join(process.cwd(), 'data', 'chat_history.json')
            let existingChatHistory: any [][] = [];
            try {
                const existingData = await fs.writeFile(filePath, 'utf-8');
                try {
                    existingChatHistory = JSON.parse(existingData)
                } catch (parseError){
                    existingChatHistory = []
                    console.warn("Invalid JSON in chat_history.json. Initializing as empty array.")
                }
                
            } catch (readError){
                if ((readError as any).code === 'ENOENT'){
                    existingChatHistory = []
                } else {
                    console.error('Error reading chat history:', readError);
                    return res.status(500).json({ error: 'Failed to read chats history.'})
                }
            }
            existingChatHistory.push(newConversation);
            const updatedData = JSON.stringify(existingChatHistory, null, 2);
            await fs.writeFile(filePath, updatedData);

            res.status(200).json({ message: 'Chat history saved successfully.'})
        } catch(error) {
            res.status(500).json({ message: 'Chats have not been saved.'})
        }
} else {
    res.status(405).end();
}
}