"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [capital, setCapital] = useState(5000);
  const [gain, setGain] = useState(2000);
  const [initMise, setInitMise] = useState(100);
  const [tour, setTour] = useState(5); // Nombre de tours d'attente avant de miser
  const l1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
  const l2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
  const l3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
  const d1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const d2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const d3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

  const [mise, setMise] = useState<number[]>([]);
  const [jeux, setJeux] = useState<any[]>([]);
  const [currentMise, setCurrentMise] = useState(initMise);
  const [currentCapital, setCurrentCapital] = useState(capital);
  const [tourRestants, setTourRestants] = useState(tour);
  const [fibonacciIndex, setFibonacciIndex] = useState(0);

  const lance = () => {
    let n = Math.floor(Math.random() * 37);
    let newJeux = [...jeux];
    
    let newRound = { l1: 0, l2: 0, l3: 0, d1: 0, d2: 0, d3: 0 };
    if (l1.includes(n)) newRound.l1 = 1;
    if (l2.includes(n)) newRound.l2 = 1;
    if (l3.includes(n)) newRound.l3 = 1;
    if (d1.includes(n)) newRound.d1 = 1;
    if (d2.includes(n)) newRound.d2 = 1;
    if (d3.includes(n)) newRound.d3 = 1;
    
    newJeux.push(newRound);
    setJeux(newJeux);
  };

  const simule = () => {
    setTourRestants(tour);
    const interval = setInterval(() => {
      if (tourRestants > 1) {
        lance();
        setTourRestants(tourRestants - 1);
      } else {
        verify();
        clearInterval(interval);
      }
    }, 1000);
  };

  const verify = () => {
    const lastRounds = jeux.slice(-tour);
    let miseArray: string | any[] | ((prevState: number[]) => number[]) = [];

    if (lastRounds.every(round => round.l1 === 0)) miseArray = l1;
    else if (lastRounds.every(round => round.l2 === 0)) miseArray = l2;
    else if (lastRounds.every(round => round.l3 === 0)) miseArray = l3;
    else if (lastRounds.every(round => round.d1 === 0)) miseArray = d1;
    else if (lastRounds.every(round => round.d2 === 0)) miseArray = d2;
    else if (lastRounds.every(round => round.d3 === 0)) miseArray = d3;

    setMise(miseArray);

    if (miseArray.length > 0) {
      setCurrentCapital(prev => prev + currentMise);
      setFibonacciIndex(prev => (prev < fibonacci.length - 1 ? prev + 1 : 0));
      setCurrentMise(initMise * fibonacci[fibonacciIndex]);

      if (currentCapital >= capital + gain) {
        alert("Félicitations ! Vous avez atteint l'objectif de gain.");
      } else {
        setTourRestants(tour); 
        simule(); 
      }
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="font-bold text-[4rem]">Simulator</h1>
      <form action="" className="grid grid-cols-4 gap-4 relative" onSubmit={(e) => { e.preventDefault(); simule() }}>
        <div className="group flex flex-col rounded-2xl duration-500">
          <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Capital</label>
          <input type="number" onChange={(e) => { setCapital(Number(e.target.value)) }} value={capital} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
        </div>
        <div className="group flex flex-col rounded-2xl duration-500">
          <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Mise</label>
          <input type="number" onChange={(e) => { setInitMise(Number(e.target.value)) }} value={initMise} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
        </div>
        <div className="group flex flex-col rounded-2xl duration-500">
          <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Gain</label>
          <input type="number" onChange={(e) => { setGain(Number(e.target.value)) }} value={gain} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
        </div>
        <div className="group flex flex-col rounded-2xl duration-500">
          <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Tour</label>
          <input type="number" onChange={(e) => { setTour(Number(e.target.value)) }} value={tour} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
        </div>
        <div className="absolute w-1/4 left-1/3 right-1/3 -bottom-16 group overflow-hidden rounded-2xl">
          <button className=" w-full font-bold rounded-2xl py-2 duration-500 text-gray-600 group-hover:text-white border-2 border-gray-600 z-10 relative">Lancer la simulation</button>
          <div className="bg-gray-600 w-full absolute top-0 bottom-0 -left-full duration-500 group-hover:left-0"></div>
        </div>
      </form>
      <div className="w-full mt-16">
        <table className="w-full">
          <thead>

            <tr>
              <th>  </th>
              <th>L1</th>
              <th>L2</th>
              <th>L3</th>
              <th>D1</th>
              <th>D2</th>
              <th>D3</th>
            </tr>
          </thead>
          <tbody>
            {jeux.map((el: { l1: any; l2: any; l3: any; d1: any; d2: any; d3: any; }, i: number) => (
              <tr key={i}>
                <td className="py-2 border border-gray-100 text-center">{i + 1}</td>
                <td className={`${el.l1 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-100`}></td>
                <td className={`${el.l2 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-100`}></td>
                <td className={`${el.l3 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-100`}></td>
                <td className={`${el.d1 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-100`}></td>
                <td className={`${el.d2 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-100`}></td>
                <td className={`${el.d3 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-100`}></td>
              </tr>
            ))}

          </tbody>
        </table>

        <div className="mt-4">
          {mise.map((el, i)=>(
            <span className="p-4" key={i}>{el}</span>
          ))}
        </div>
      </div>
    </main>
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/fibonnacci"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Aller à Fibonnacci →
      </Link>
    </footer>
  </div>
  );
}
