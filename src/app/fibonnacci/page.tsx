"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [tour, setTour] = useState('7')
  const [montant, setMontant] = useState('5300')
  const [initMise, setInitMise] = useState('100')
  const [reste, setReste] = useState('0')
  const [byMont, setByMont] = useState(false)

 const calcule = ()=>{
    if (byMont) {
        let m = 0
        let i = 0
        let f = [1, 1]
        while (m<Number(montant)) {
            console.log(f);
            if (m + (Number(initMise) * f[1]) <= Number(montant)) {
                m = m + (Number(initMise) * f[1])
            }else{
                setTour(i.toString())
                setReste((Number(montant) - m).toString())
                return
            }
            let a = f[0]
            f[0] = f[1]
            f[1] =  a + f[1]
            i++;
        }
        setTour(i.toString())
        
    }else{
        
        let m = 0
        let i = 0
        let f = [1, 1]
        while (i<Number(tour)) {
            console.log(f);
            m = m + (Number(initMise) * f[1])
            let a = f[0]
            f[0] = f[1]
            f[1] =  a + f[1]
            i++;
        }
        setMontant(m.toString())
    }
 }



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-[4rem]">Fibonnacci</h1>
        {!byMont && (
        <form action="" className="grid grid-cols-4 gap-4 relative" onSubmit={(e) => { e.preventDefault(); calcule() }}>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Nombre de tour</label>
            <input type="number" onChange={(e) => { setTour(e.target.value) }} value={tour} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
          </div>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Mise</label>
            <input type="number" onChange={(e) => { setInitMise(e.target.value) }} value={initMise} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
          </div>
          <div className="group flex flex-col rounded-2xl duration-500 font-bold text-[4rem]">
            <label htmlFor="number" className="mb-5"></label>
            <span className="pl-20">{`${'->'}`}</span>
          </div>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Montant</label>
            <span  className="block p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" >{montant}</span>
          </div>
          
          <div className="absolute w-1/4 left-1/3 right-1/3 -bottom-16 group overflow-hidden rounded-2xl">
            <button className=" w-full font-bold rounded-2xl py-2 duration-500 text-gray-600 group-hover:text-white border-2 border-gray-600 z-10 relative">Calculer</button>
            <div className="bg-gray-600 w-full absolute top-0 bottom-0 -left-full duration-500 group-hover:left-0"></div>
          </div>
        </form>
        )}
        {byMont && (
        <form action="" className="grid grid-cols-4 gap-4 relative" onSubmit={(e) => { e.preventDefault(); calcule() }}>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Montant</label>
            <input type="number" onChange={(e) => { setMontant(e.target.value) }} value={montant} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
          </div>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Mise</label>
            <input type="number" onChange={(e) => { setInitMise(e.target.value) }} value={initMise} className="p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" />
          </div>
          <div className="group flex flex-col rounded-2xl duration-500 font-bold text-[4rem]">
            <label htmlFor="number" className="mb-5"></label>
            <span className="pl-20">{`${'->'}`}</span>
          </div>
          <div className="group flex flex-col rounded-2xl duration-500">
            <label htmlFor="number" className="mb-2 text-gray-600 font-bold text-2xl">Nombre de tour</label>
            <span  className="block p-4 focus-visible:outline-none focus-visible:border-gray-400 border-gray-200 rounded-2xl border-2" >{tour}</span>
          </div>
          <span>  Montant restant : {reste}</span>
          
          
          <div className="absolute w-1/4 left-1/3 right-1/3 -bottom-16 group overflow-hidden rounded-2xl">
            <button className=" w-full font-bold rounded-2xl py-2 duration-500 text-gray-600 group-hover:text-white border-2 border-gray-600 z-10 relative">Calculer</button>
            <div className="bg-gray-600 w-full absolute top-0 bottom-0 -left-full duration-500 group-hover:left-0"></div>
          </div>
        </form>
        )}
          <div className="relative w-1/4 left-1/3 right-1/3 -bottom-16 group overflow-hidden rounded-2xl">
            <button onClick={(e)=>{setByMont(!byMont)}} className=" w-full font-bold rounded-2xl py-2 duration-500 text-white group-hover:text-gray-600 border-2 border-gray-600 z-10 relative">{!byMont ? 'En fonction du montant' : "En fonction du nombre de tour"}</button>
            <div className="bg-gray-600 w-full absolute top-0 bottom-0 left-0 duration-500 group-hover:-left-full"></div>
          </div>
        <div className="w-full mt-16">
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
