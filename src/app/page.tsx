import Image from "next/image";

export default function Home() {
  return (
    <main className="homeContainer flex flex-col xl:flex-row h-screen">
      <section className="relative flex-1">
        <Image width={1920} height={2880} className="w-full h-auto max-h-[50vh] xl:max-h-screen object-cover" alt="An image of two people having a conversation" src="/home.jpg" />
        <a className="text-white absolute bottom-[15px] text-[0.5rem] lg:text-[0.8rem] pl-3" href="https://unsplash.com/es/@charlesdeluvio">Photograph by charlesdeluvio on Unsplash</a>
      </section>
      <section className="flex flex-1 flex-col justify-around px-5 lg:px-20 py-10">
        <div className="headlineContainer flex flex-col flex-1 justify-around lg:justify-evenly items-center">
          <Image width={450} height={100} className="w-[200px] md:w-[450px] " alt="ReflexAI logo" src="reflexai_logo.svg" />
          <p className="text-sm">A front end exercise with a simulated chatbot and control panel.</p>
        </div>
        <div className="button-container flex flex-col flex-1 gap-6 lg:items-center">
          <a href="/chat"><button className="w-full lg:w-[20rem] bg-primary rounded-[24px] py-[0.575rem] lg:py-[0.875rem] px-[1.5625rem] font-bold text-white transition ease-in-out transition ease-in-out border-2 border-transparent hover:bg-white hover:text-dark hover:border-primary">
            Chat with us
          </button></a>
          <button className="w-full lg:w-[20rem] rounded-[24px] py-[0.575rem] lg:py-[0.875rem] px-[1.5625rem] border-2 border-solid border-primary font-bold text-dark transition ease-in-out hover:bg-primary hover:text-white">
            Admin Panel
          </button>
        </div>
      </section>
    </main>
  );
}
