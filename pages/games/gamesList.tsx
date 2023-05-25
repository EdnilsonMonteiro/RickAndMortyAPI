'use client'

import Image from 'next/image';
import { useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { FaHeartbeat, FaGhost, FaGamepad } from 'react-icons/fa';
import { RiAliensFill } from 'react-icons/ri';
import { GiCardPickup, GiCardRandom, GiAnimalSkull } from 'react-icons/gi';

import Link from 'next/link';

export default function gamesList() {

  return (
    <main className="flex flex-col justify-between items-center h-screen">

      <div className="flex mt-3 text-3xl">
            <Link href="/">
                <BsArrowLeftCircle className="absolute top-0 left-0 mt-3 ml-3 text-3xl" />
            </Link>
            <FaGamepad className="mt-1"/>
            <h1 className="mx-5">List of Minigames</h1>
            <FaGamepad className="mt-1"/>
        </div>

      <div className='items-center h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>

        <Link href='AliveOrDead'>
        <div className={`border-2 border-gray-300 rounded-md bg-blue-500 hover:bg-blue-600 hover:border-black transition duration-300 ease-in-out p-2 text-center`}>
          <button className='flex w-200 text-white justify-center mb-3'>
            <FaHeartbeat className="mr-1 mt-1"/>
            <h1>Alive or dead?</h1>
            <FaGhost className="ml-1 mt-1"/>
          </button>
          <Image className='ml-3 rounded-sm' src='/images/minigames/AliveOrDead.PNG' width={180} height={180} alt='AliveOrDead' />
        </div>
         
        </Link>

        <Link href='SpeciesGame'>
        <div className={`border-2 border-gray-300 rounded-md bg-blue-500 hover:bg-blue-600 hover:border-black transition duration-300 ease-in-out p-2 text-center`}>
          <button className='flex w-200 text-white justify-center mb-3'>
            <RiAliensFill className="mr-1 mt-1"/>
              <h1>What's the specie?</h1>
            <GiAnimalSkull className="ml-1 mt-1"/>
          </button>

          <Image className='ml-3 rounded-sm' src='/images/minigames/WhatsTheSpecie.PNG' width={180} height={180} alt='AliveOrDead' />
        </div>
        </Link>

        <Link href='MemoryGame'>
        <div className={`border-2 border-gray-300 rounded-md bg-blue-500 hover:bg-blue-600 hover:border-black transition duration-300 ease-in-out p-2 text-center`}>
          <button className='flex w-200 text-white justify-center mb-3'>
            <GiCardPickup className="mr-1 mt-1"/>
              <h1>Memory Game</h1>
            <GiCardRandom className="ml-1 mt-1"/>
          </button>

          <Image className='ml-1 rounded-sm' src='/images/minigames/MemoryGame.PNG' width={192} height={192} alt='AliveOrDead' />
        </div>
        </Link>

        <Link href='JigsawPuzzle'>
        <div className={`border-2 border-gray-300 rounded-md bg-blue-500 hover:bg-blue-600 hover:border-black transition duration-300 ease-in-out p-2 text-center`}>
          <button className='flex w-200 text-white justify-center mb-3'>
            <GiCardPickup className="mr-1 mt-1"/>
              <h1>Jigsaw Puzzle</h1>
            <GiCardRandom className="ml-1 mt-1"/>
          </button>
          
          <Image className='ml-3 rounded-sm' src='/images/minigames/PuzzleIncomplete.PNG' width={180} height={180} alt='AliveOrDead' />
        </div>
        </Link>
       
      </div>
    </main>
  );
}