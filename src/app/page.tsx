"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [capital, setCapital] = useState('5000')
  const [gain, setGain] = useState('2000')
  const [initMise, setInitMise] = useState('100')
  const [tour, setTour] = useState('5')
  const l1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
  const l2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
  const l3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
  const d1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const d2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const d3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]
  const [mise, setMise] = useState<number[]>([])
  const [jeux, setJeux] = useState<any>([])


  const lance = (t:any, ta:any=[]) => {
    let tab = t.slice(0, t.length)
    let n = Math.floor(Math.random() * 37)
    console.log(n);
    console.log(tab);
    
    
    if (l1.includes(n)) {
      tab.push({ l1: 1, l2: 0, l3: 0, d1: 0, d2: 0, d3: 0 })
    } else if (l2.includes(n)) {
      tab.push({ l1: 0, l2: 1, l3: 0, d1: 0, d2: 0, d3: 0 })
    } else if (l3.includes(n)) {
      tab.push({ l1: 0, l2: 0, l3: 1, d1: 0, d2: 0, d3: 0 })
    } else if (n == 0) {
      tab.push({ l1: 0, l2: 0, l3: 0, d1: 0, d2: 0, d3: 0 })
    }
    if (d1.includes(n)) {
      tab[tab.length - 1].d1 = 1
    } else if (d2.includes(n)) {
      tab[tab.length - 1].d2 = 1
    } else if (d3.includes(n)) {
      tab[tab.length - 1].d3 = 1
    }
    setJeux(tab)
    // t = tab.slice(0, tab.length)
  }
  const simule = () => {
    let i = 0

    let tab: any[] = []
    while (i <= 4) {
      lance(jeux)
      
      i++;
    }
    verify(jeux)

  }

  const verify = (t: any[]) => {
    let L1 = []
    let L2 = []
    let L3 = []
    let D1 = []
    let D2 = []
    let D3 = []
    let tab = t.slice(0, t.length)
    for (let i = 1; i <= 5; i++) {
      L1.push(tab[tab.length - i].l1)
      L2.push(tab[tab.length - i].l2)
      L3.push(tab[tab.length - i].l3)
      D1.push(tab[tab.length - i].d1)
      D2.push(tab[tab.length - i].d2)
      D3.push(tab[tab.length - i].d3)


    }

    if (L1.reduce((a,c)=>a + c, 0) == 0) {
      setMise(l1.slice(0, l1.length))
    } else if (L2.reduce((a,c)=>a + c, 0) == 0) {
      setMise(l2.slice(0, l2.length))
    } else if (L3.reduce((a,c)=>a + c, 0) == 0) {
      setMise(l3.slice(0, l3.length))
    } else if (D1.reduce((a,c)=>a + c, 0) == 0) {
      setMise(d1.slice(0, d1.length))
    } else if (D2.reduce((a,c)=>a + c, 0) == 0) {
      setMise(d2.slice(0, d2.length))
    } else if (D3.reduce((a,c)=>a + c, 0) == 0) {
      setMise(d3.slice(0, d3.length))
    } else {
      setMise([])
      lance(jeux)
    }
    console.log(L1);
    console.log(L2);
    console.log(L3);
    console.log(D1);
    console.log(D2);
    console.log(D3);
    console.log(mise)

  }




  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-[4rem]">Simulator</h1>
        <form action="" className="grid grid-cols-4 gap-4 relative" onSubmit={(e) => { e.preventDefault(); simule() }}>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Capital</label>
            <input type="number" onChange={(e) => { setCapital(e.target.value) }} value={capital} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
          </div>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Mise</label>
            <input type="number" onChange={(e) => { setInitMise(e.target.value) }} value={initMise} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
          </div>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Gain</label>
            <input type="number" onChange={(e) => { setGain(e.target.value) }} value={gain} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
          </div>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Tour</label>
            <input type="number" onChange={(e) => { setTour(e.target.value) }} value={tour} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
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
