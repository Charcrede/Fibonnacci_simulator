"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

    const [num, setNum] = useState('0')
    const l1 = [1,4,7,10,13,16,19,22,25,28,31,34];
    const l2 = [2,5,8,11,14,17,20,23,26,29,32,35];
    const l3 = [3,6,9,12,15,18,21,24,27,30,33,36];
    const d1 = [1,2,3,4,5,6,7,8,9,10,11,12];
    const d2 = [13,14,15,16,17,18,19,20,21,22,23,24];
    const d3 = [25,26,27,28,29,30,31,32,33,34,35,36];
    const [jeux, setJeux] = useState<any>([])
    const simule = ()=>{
       let tab = jeux.slice(0, jeux.length)
        let n = num == '0' || num == '00' ? 0 : Number(num)
        if (l1.includes(n)) {
          tab.push({l1 : 1, l2: 0, l3 : 0, d1 : 0, d2 : 0, d3:0})
        }else if (l2.includes(n)) {
          tab.push({l1 : 0, l2: 1, l3 : 0, d1 : 0, d2 : 0, d3:0})
        }else if (l3.includes(n)) {
          tab.push({l1 : 0, l2: 0, l3 : 1, d1 : 0, d2 : 0, d3:0})
        }else if(n == 0){
          tab.push({l1 : 0, l2: 0, l3 : 0, d1 : 0, d2 : 0, d3:0})
        }
        if (d1.includes(n)) {
           tab[tab.length-1].d1 = 1
        }else if (d2.includes(n)) {
           tab[tab.length-1].d2 = 1
        }else if (d3.includes(n)) {
           tab[tab.length-1].d3 = 1
        }
        setJeux(tab)
        setNum('')
        
    }

    const del = (i:number)=>{
        let tab = jeux.slice(0, jeux.length)
        tab.splice(i,1)
        setJeux(tab)
    }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="font-bold text-[4rem] basis-full mt-48">Memoriser</h1>
      <main className="flex gap-8 items-center w-full">
        <form action="" className="flex flex-col gap-4 items-end fixed top-1/2" onSubmit={(e)=>{e.preventDefault(); simule()}}>
            <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Numero</label>
            <input type="number" onChange={(e)=>{setNum(e.target.value)}} value={num} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
            </div>
            <div className="relative group overflow-hidden rounded-2xl w-full">
                <button className=" w-full font-bold rounded-2xl py-4 duration-500 text-gray-600 group-hover:text-white border-2 border-gray-600 z-10 relative">Enregistrer un tour</button>
            <div className="bg-gray-600 w-full absolute top-0 bottom-0 -left-full duration-500 group-hover:left-0"></div>
            </div>
        </form>
        <div className="w-5/6 float-right ml-72 mt-16">
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
          {jeux.map((el: { l1: any; l2: any; l3: any; d1: any; d2: any; d3: any; }, i : number) => (
            <tr key={i}>
              <td className="py-2 border border-gray-300 text-center">{i+1}</td>
              <td className={`${el.l1 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-300`}></td>
              <td className={`${el.l2 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-300`}></td>
              <td className={`${el.l3 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-300`}></td>
              <td className={`${el.d1 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-300`}></td>
              <td className={`${el.d2 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-300`}></td>
              <td className={`${el.d3 ? "bg-blue-300" : "bg-white"} py-4 border border-gray-300`}></td>
              <td className="py-2 border border-gray-300 text-center font-bold text-red-500"><button onClick={()=>{del(i)}}>X</button></td>
            </tr>
          ))}
              
            </tbody>
          </table>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/simulator"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Aller au simulateur →
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
