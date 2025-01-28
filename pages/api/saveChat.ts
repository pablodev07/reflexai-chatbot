import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const messages = req.body;
            const filePath = path.join(process.cwd(), 'data', 'chat_history.json')
            const data = JSON.stringify(messages, null, 2)
            await fs.writeFile(filePath, data);
            res.status(200).json({ message: 'Chat history saved successfully.'})
        } catch(error) {
            res.status(500).json({ message: 'Chats have not been saved.'})
        }
} else {
    res.status(403).json({ message: 'Method not allowed.'})
}
}