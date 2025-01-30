import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const filePath = path.join(process.cwd(), 'data', 'chat_history.json')
        const data = await fs.readFile(filePath, 'utf-8');
        const chatLogs = JSON.parse(data)
        res.status(200).json(chatLogs);
    } catch (error){
        console.error('Error fetching chat logs:',error);
        res.status(500).json({error: 'Failed to fetch chat logs'});
    }
}