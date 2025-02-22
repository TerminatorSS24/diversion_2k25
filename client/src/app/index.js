import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-white p-6">
      
      {/* Web3 Styled Header */}
      <header className="absolute top-4 left-4 text-xl font-bold tracking-wide">
        GigEscrow<span className="text-blue-500">.Web3</span>
      </header>

      {/* Main Section */}
      <main className="glassmorphism p-8 rounded-3xl text-center w-full max-w-3xl">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Gig Escrow Web3"
          width={180}
          height={38}
          priority
        />
        
        <h1 className="text-3xl font-extrabold mt-4 tracking-wide text-blue-500">
          Decentralized Freelance Escrow
        </h1>
        
        <p className="text-gray-300 mt-2">
          Secure, trustless gig payments using Ethereum smart contracts.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            className="btn-glow"
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Deploy Now
          </a>
          <a
            className="btn-outline"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            📖 Read Docs
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-500 text-sm">
        Powered by Ethereum | Smart Contracts for Freelancers
      </footer>

      {/* Web3 Background Effects */}
      <div className="absolute w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl top-10 left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl bottom-10 right-20"></div>
    </div>
  );
}
