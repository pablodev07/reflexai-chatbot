import { GoHome, GoPerson, GoBell } from "react-icons/go";

export default function Home() {
  return (
    <main className="chatContainer flex flex-col lg:flex-row h-screen">
      <nav className="border-r-2 border-solid border-gray-200 w-[10%]">
        <div className="admIcons flex flex-col pt-5 gap-7">
          <button className="mx-auto">
            <GoHome className="w-auto h-[30px] text-dark hover:text-darkgreen" aria-label="Go to Home" />
          </button>
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
          <div className="conversationContainer flex flex-1 h-full overflow-y-auto"></div>
          <input className="chatInput sticky bottom-0 rounded-[24px] min-h-[200px] w-[90%] px-5 border-2 border-gray-200 outline-primary mx-auto"></input>
      </section>
    </main>
  );
}
