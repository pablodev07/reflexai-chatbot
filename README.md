This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## About the project

This is an exercise I did for the position of front end developer at ReflexAI. 
The idea was to create a small webapp that would simulate chatting with a bot (which has four hardcoded answers). Then, you would access an admin panel where you could see the logged conversations.

## How does it work?

There's a deployed version on Vercel for you to play around with it.
- For chat, just go to /chat and start writing your message. Press enter or hit the 'Submit' button. You can type as many messages as you like, the bot will respond with up to 4 different messages and start all over again. Whenever you want to stop, hit the 'Close and save chat' button at the top of the chat. It will save the conversation you just had. The conversation will start over again.
- To see the chat logs, go to /admin. They will be displayed in cards, including a unformatted timestamp.
- This a responsive and accessible (as much as possible) webapp.

