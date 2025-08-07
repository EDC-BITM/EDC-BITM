import React from 'react';

export default function ProblemStatements() {
  return (
    <section
      id="problems"
      className="w-full flex items-center justify-center px-4"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 p-6 w-full max-w-7xl">
        
        <h2
          className="text-2xl sm:text-4xl lg:text-7xl tracking-tight bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 25%, #EC4899 55%, #F59E0B 80%, #FDE68A 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Problem Statements
        </h2>

        {/* Problem Card with Gradient Overlay */}
        <div className="relative group w-[90%] h-[90vh] max-w-3xl flex items-center justify-center">
          {/* Gradient hover background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                          rounded-2xl w-full h-full" />

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 
                          rounded-2xl border border-white/20 backdrop-blur-md bg-white/10 
                          shadow-md text-white/73 text-base space-y-4 overflow-y-auto">
            <ol className="list-decimal list-inside space-y-5">
              <li>
                <strong>Simplified DeFi Aggregator:</strong> Build a user-friendly dashboard that automatically finds and invests in the best DeFi yield farming options using smart contracts.
              </li>
              <li>
                <strong>Tokenized Real Estate:</strong> Create a platform for fractional ownership and trading of local landmarks using NFTs and smart contracts.
              </li>
              <li>
                <strong>Dynamic NFT Tickets:</strong> Design event tickets as evolving NFTs that change based on user participation and offer loyalty benefits.
              </li>
              <li>
                <strong>AI DeFi Agent on Base:</strong> Develop an AI agent that understands natural language commands and performs DeFi transactions autonomously using Coinbase tools.
              </li>
              <li>
                <strong>AI Smart UPI for Web3:</strong> Build a payment system that uses AI to execute intent-based, conditional, or recurring crypto payments like "Smart UPI."
              </li>
              <li>
                <strong>Digital Identity for Refugees:</strong> Create a dApp for displaced civilians to generate a tamper-proof digital identity using wallets and encrypted data.
              </li>
              <li>
                <strong>Decentralized Aid Distribution:</strong> Develop a blockchain-based platform to track, verify, and transparently manage the distribution of aid during crises.
              </li>
            </ol>
            <div className="flex justify-center items-center mt-6">
             <a href = "https://docs.google.com/document/d/1lI_YH2T3B1aaMFyDUwMbpVKovJzyFoXRvAm-HZ37Bvg/edit?tab=t.0">
             <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-md hover:from-purple-700 hover:to-blue-700 transition duration-300">
               Know More
              </button>
              </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
