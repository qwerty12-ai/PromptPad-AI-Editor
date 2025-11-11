
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Script from "next/script";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PromptPad – Your Personal AI Prompt Lab 🧠",
  description: "PromptPad is your all-in-one playground for crafting, editing, comparing, and analyzing AI prompts. Built for creators, prompt engineers, and developers who love experimenting with ideas. ✨",
  authors: [{ name: "Sabeeh", url: "https://github.com/qwerty12-ai" }],
  creator: "Sabeeh",
  keywords: [
    "AI prompts",
    "prompt engineering",
    "OpenAI",
    "GPT",
    "prompt editor",
    "prompt analytics",
    "Next.js",
    "React",
    "AI tools",
  ],
  siteName: "PromptPad",
  icons: {
    icon: "og/icon"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><Script src="https://js.puter.com/v2/" strategy="beforeInteractive" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <Navbar />
          {children}
          <Footer />
        </SessionWrapper>
        
      </body>
    </html>
  );
}
