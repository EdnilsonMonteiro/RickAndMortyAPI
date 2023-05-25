import { getCharacterById } from "../../api/rickAndMorty"
import { useState } from "react"

import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { FaHeartbeat, FaGhost } from 'react-icons/fa';
import PlayButton from "@/pages/components/PlayButton";

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

export default function Quiz() {

  const [character, setCharacter] = useState<Character | null>(null);
  const [points, setPoints] = useState<number>(0)

  const randomCharacter = async () => {
      const characterData: Character = await getCharacterById()
      setCharacter(characterData);
  }

  const addPontuation = (response: 'Alive' | 'Dead') => {
      if (character && character.status === response) {
      setPoints(points + 1);
      }
  }
    
    return(
        <main className="flex min-h-screen flex-col justify-between items-center">

        <div className="flex mt-3 text-3xl">
            <Link href="/games/gamesList">
                <BsArrowLeftCircle className="absolute top-0 left-0 mt-3 ml-3 text-3xl" />
            </Link>
            <FaHeartbeat className="mt-1" />
              <h1 className="mx-5">Alive or Dead</h1>
            <FaGhost className="mt-1"/>
        </div>

        {!character &&
            <PlayButton startGame={randomCharacter} />
        }
        

        {character &&
              <div key={character.id} className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-4 bg-white border border-black rounded-lg mx-1 my-3'>
                <div className='flex justify-center'> 
                  <Image alt={character.name} width={300} height={300} className='h-auto max-w-full rounded-lg ' src={character.image} />
                </div>

                <div className='mt-4 text-lg'>
                  <div className='flex justify-center mb-3 text-blue-500'>
                    <h4>{character.name}</h4>
                  </div>

                </div>

                <h4 className="my-4 flex justify-center text-lg">Score: {points}</h4>

                <div className="flex justify-around mt-4">
                    <button onClick={() => {addPontuation('Alive'); randomCharacter()}} className="text-white bg-green-500 p-2 rounded-lg">ALIVE</button>
                    <button onClick={() => {addPontuation('Dead'); randomCharacter()}} className="text-white bg-red-500 p-2 rounded-lg">DEAD</button>
                </div>
              </div>
        }
        <p className="text-white">.</p>



        

        </main>
    )
    
}