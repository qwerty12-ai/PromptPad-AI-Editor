"use client"
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

const Navbar = () => {
    const { data: session, status } = useSession()

    if (status === "loading") return null;

    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow sm:px-3">
            <Link href="/" className="font-bold text-xl cursor-pointer"><span>PromptPad</span></Link>
            <div className="flex items-center space-x-4">
                {session ? (
                    <div className="flex items-center space-x-2">
                        <span>{session.user.name}</span>
                        {
                            session.user.name && (
                                <img
                                    src={session.user.image}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                            )
                        }
                        <button className="bg-red-500 px-2 py-1 hover:bg-red-600 text-sm" onClick={() => signOut()}>Logout</button>
                    </div>
                ) : (
                    <button className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        onClick={() => signIn("github")}>Login</button>
                )}
            </div>
        </nav>
    )
}

export default Navbar