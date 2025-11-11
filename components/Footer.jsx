"use client";

import React, { useState, useEffect } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(date.toLocaleString("en-IN", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gray-900 border-t border-gray-700 mt-8 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 sm:gap-0">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} <strong>PromptPad</strong> — Built by{" "}
          <a
            href="https://github.com/qwerty12-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Sabeeh
          </a>
        </p>

        <p className="text-xs text-gray-400">
          Creation Time (IST): {currentTime}
        </p>

        <p className="text-sm text-gray-400">
          Powered by{" "}
          <a
            href="https://developer.puter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Puter
          </a>{" "}
          &nbsp;|&nbsp; Built with ❤️ using Next.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;