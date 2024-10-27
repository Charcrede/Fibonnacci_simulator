"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

    const [note, setNote] = useState('5000')

    return (
        <div className=" items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <main className="relative w-full">
                <h1 className="font-bold text-[4rem]">Notes</h1>
                <form action="" className="grid grid-cols-1 gap-4">
                    <textarea onChange={(e) => { setNote(e.target.value) }} value={note} className=" min-h-[60vh] opacity-  top-0 bottom-0 left-0 right-0  w-full p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
                </form>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-20">
                <Link
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="/memory"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Aller au mémorisateur →
                </Link>
            </footer>
        </div>
    );
}
