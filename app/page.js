"use client";

import React from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-snug text-black">
          Welcome to PromptPad — A tool for prompt engineers, creators, and AI explorers.
        </h1>

        <div className="text-gray-700 text-sm sm:text-base md:text-lg mb-8 leading-relaxed px-2 sm:px-4">
          <p className="mb-4">
            Your personal AI prompt editor and analytical tool. Edit prompts, view their outputs,
            compare performance, and analyze trends — all in one place.
          </p>

          <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 sm:p-5 mt-4 rounded-md text-xs sm:text-sm md:text-base text-center shadow-sm">
            ⚠️ <strong>Note:</strong> Analytics currently display <strong>0 ms latency</strong> per prompt — this is expected due to the current site design.
            Stay tuned for upcoming updates with better UI/UX and new features!
            <br />
            <br />
            🔒 <strong>Why GitHub Only?</strong>{" "}
            PromptPad is built for developers, prompt engineers, and creators who live in code.
            GitHub login keeps it secure, focused, and aligned with the community it was made for.
            More auth options may come later — but for now, it’s intentionally{" "}
            <strong>developer-first</strong>.
          </div>
        </div>

        <div className="flex justify-center">
          {session ? (
            <Link
              href="/dashboard"
              className="inline-block px-6 sm:px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm sm:text-base md:text-lg shadow-md w-full sm:w-auto"
            >
              Go to Dashboard
            </Link>
          ) : (
            <button
              onClick={() => signIn()}
              className="inline-block px-6 sm:px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition text-sm sm:text-base md:text-lg shadow-md w-full sm:w-auto"
            >
              Login to Access Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
