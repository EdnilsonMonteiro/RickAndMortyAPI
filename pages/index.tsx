'use client'

import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCharacter } from './api/rickAndMorty';
import { createContext, useContext, useState } from 'react';
import { BsSearch, BsController } from 'react-icons/bs';
import Link from 'next/link';

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  type: string;
  status: string;
}

export const CharacterContext = createContext<Character[]>([]);

export default function Home() {
  const [characterId, setCharacterId] = useState('');
  const [characterInfo, setCharacterInfo] = useState<Character[]>([]);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const character = await getCharacter(characterId);
    setCharacterInfo(character);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterId(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between items-center">
      <div className="bg-gray-200 fixed right-3 h-auto flex items-center top-2/4 p-2 rounded">
        <button onClick={() => router.push('/quiz')}>
          <BsController className="text-4xl" />
        </button>
      </div>

      <h1 className="text-4xl mt-4">Rick and Morty Character Finder</h1>

      <form className="flex items-center mt-4" onSubmit={handleSubmit}>
        <label className="mb-2 text-lg">
          <input
            placeholder="Nome do(a) personagem"
            className="ml-2 p-2 border border-gray-300 rounded-md"
            type="text"
            value={characterId}
            onChange={handleChange}
          />
        </label>
        <button className="mb-2 bg-gray-400 p-2 rounded ml-3 text-lg flex" type="submit">
          <BsSearch className="mr-2 ml-1 mt-1" /> Buscar
        </button>
      </form>

      <hr className="border border-black w-4/5 my-7" />

      {characterInfo && <h1 className='text-3xl'>Resultados:</h1> }
      <div className="flex flex-wrap justify-around">
        {characterInfo && characterInfo.length  > 0 ? (
          characterInfo.map((character) => {
          return (
            <>
              <div key={character.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white-100 border border-black rounded-lg mx-1 my-3'>
                <div className='flex justify-center'> 
                  <Image alt={character.name} width={300} height={300} className='h-auto max-w-full rounded-lg ' src={character.image} />
                </div>

                <div className='mt-4 text-lg'>
                  <div className='flex justify-center mb-3'>
                    <h4>{character.name}</h4>
                  </div>
                  <h4>Gênero: {character.gender}</h4>
                  <h4>Espécie: {character.species} {character.type && "/"} {character.type}</h4>
                  <h4 className='flex'>
                    Status: <p className={`${character.status === "Alive" ? "text-green-500" : "text-red-500"}`}>{character.status === "Alive" ? " Vivo" : " Morto"}</p>
                  </h4>
                </div>
              </div>
            </>
          )
        })
      ) : (
        <div className='mb-60 text-4xl'>
          <p>Nenhum personagem encontrado</p>
        </div>
      )}
        </div>

    </main>
  );
}