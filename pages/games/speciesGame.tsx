import { getCharacterById } from "../api/rickAndMorty"
import shuffle from 'lodash/shuffle';
import { useState } from "react"

import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeftCircle, BsEgg, BsTrophy } from 'react-icons/bs';

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

export default function SpeciesGame() {

const [character, setCharacter] = useState<Character | null>(null);
const [points, setPoints] = useState<number>(0)
const [showSpecies, setShowSpecies] = useState<Species[]>([]);

const randomCharacter = async () => {
    const characterData: Character = await getCharacterById()
    setCharacter(characterData);
    setShowSpecies(sortSpecies(characterData))
}

const species: string[] = ['Alien', 'Animal', 'Cronenberg', 'Disease', 'Robot', 'Human', 'Mythological Creature', 'Parasite', 'Planet', 'Poopybutthole', 'unknown']

type Species = typeof species[number]

const addPontuation = (response: Species) => {
    if (character && character.species === response) {
    setPoints(points + 1);
    randomCharacter()
    } else {
      setPoints(points - 1)
      randomCharacter()
    }
}

function sortSpecies(character: Character): Species[] {
  const speciesCopy: string[] = [...species];
  const index: number = speciesCopy.indexOf(character.species);
  if (index > -1) {
    speciesCopy.splice(index, 1);
  }
  const selectedSpecies:string[] = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex: number = Math.floor(Math.random() * speciesCopy.length);
    selectedSpecies.push(speciesCopy[randomIndex]);
    speciesCopy.splice(randomIndex, 1);
  }
  selectedSpecies.push(character.species)
  return shuffle([...selectedSpecies]) as Species[];
}

    
    return(
        <main className="flex min-h-screen flex-col justify-between items-center">

        <div className="flex mt-3 text-3xl">
            <Link href="/games/gamesList">
                <BsArrowLeftCircle className="absolute top-0 left-0 mt-3 ml-3 text-3xl" />
            </Link>
            <BsEgg className="mt-1" />
            <h1 className="mx-5">Qual a espécie?</h1>
            <BsTrophy className="mt-1"/>
        </div>

        {!character &&
            <button className="text-3xl bg-green-300 p-4 rounded-lg" onClick={() => {randomCharacter()}}>Começar jogo</button>
        }  

        {character && (
          <div key={character.id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-4 bg-white border border-black rounded-lg mx-1 my-3">
            <div className="flex justify-center">
              <Image alt={character.name} width={300} height={300} className="h-auto max-w-full rounded-lg " src={character.image} />
            </div>
            <div className="mt-4 text-lg">
              <div className="flex justify-center mb-3 text-blue-500">
                <h4>{character.name}</h4>
              </div>
            </div>
            <h4 className="my-4 flex justify-center text-lg">Pontuação: {points}</h4>
            <div className="flex justify-around mt-4 flex-wrap">
              {showSpecies.map((specie) => (
                <button key={specie} onClick={() => addPontuation(specie)} className="text-white bg-green-500 p-2 rounded-lg my-1 hover:bg-green-400">
                {specie}
              </button>
              ))}
            </div>
          </div>
        )}
        <p className="text-white">.</p>
        </main>
    )
    
}