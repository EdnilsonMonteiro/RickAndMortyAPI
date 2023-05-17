'use client'

import { useRouter } from 'next/router';
import Image from 'next/image';
import { createContext, useContext, useState } from 'react';
import { BsSearch, BsController, BsArrowLeftCircle } from 'react-icons/bs';
import Link from 'next/link';

export default function gamesList() {

  return (
    <main className="flex flex-col justify-between items-center h-screen">

      <div className="flex mt-3 text-3xl">
            <Link href="/">
                <BsArrowLeftCircle className="absolute top-0 left-0 mt-3 ml-3 text-3xl" />
            </Link>
            <h1 className="mx-5">List of Minigames</h1>
        </div>

      <div className='flex justify-center items-center h-full overflow-auto'>

        <Link href='quiz'>
          <button className='mx-2 border-2 rounded-md border-gray-300 drop-shadow-sm bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out p-2 '>
            <h1 className='text-white'>Morto ou vivo?</h1>
          </button>
        </Link>

        <Link href='speciesGame'>
          <button className='mx-2 border-2 rounded-md border-gray-300 drop-shadow-sm bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out p-2 '>
            <h1 className='text-white'>Qual a espécie?</h1>
          </button>
        </Link>

        <Link href='memoryGame'>
          <button className='mx-2 border-2 rounded-md border-gray-300 drop-shadow-sm bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out p-2 '>
            <h1 className='text-white'>Jogo da memória</h1>
          </button>
        </Link>
      </div>

    </main>
  );
}