'use client'

import { getCharactersById } from "../../api/rickAndMorty"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import Link from 'next/link';

import styles from './memoryGame.module.css';
import { GiCardPickup, GiCardRandom } from "react-icons/gi";
import PlayButton from "@/pages/components/PlayButton";

interface Character {
  id:number;
  name: string;
  image: string;
}

export default function MemoryGame() {

  const [characters, setCharacters] = useState<Character []>([]); //armazena os personagens da API RickAndMorty
  const [shuffledCards, setShuffledCards] = useState<Character[]>([]); //armazena as cartas duplicadas e já embaralhadas
  const [gameOver, setGameOver] = useState<boolean>(true) //determina se o jogo acabou

  const [flippedCards, setFlippedCards] = useState<number[]>([]); //irá guarda os index das primeiras duas cartas viradas
  const [matchedCards, setMatchedCards] = useState<number[]>([]); //guardará os index das cartas determinadas como correspondentes
  const [moves, setMoves] = useState<number>(0) //Conta a quantidade de movimentos do usuário
  const [time, setTime] = useState<number>(0) //Conta a quantidade de tempo do usuário
  const [finalTime, setFinalTime] = useState<number | null>(null); //Valor que define o tempo em que o usuário terminou o jogo


  //Busca na API Rick and Morty persoangens da serie aleatoriamente
  const randomCharacters = async () => {
      const charactersData: Character[] = await getCharactersById();
      setCharacters(charactersData);
  }

  //randomiza os personagens e embaralha ao inicar a página, necessário pois ao utilizar startGame não há tempo de carregar para aparecerem.
  useEffect(() => {
    randomCharacters()
    shuffle()
  },[])

  //Inicia o jogo, zerando as variáveis antigas
  const startGame = () => {
    randomCharacters()
    shuffle()
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setTime(0)
    setMoves(0)
  }

  //Reinicia o jogo
  const restart = () => {
    setGameOver(true)
  }

  //Embaralha as cartas
  const shuffle = () => {
    const shuffleCards: Character[] = [...characters, ...characters].sort(() => Math.random() - 0.5)

    setShuffledCards(shuffleCards)
  }

  //Verifica se o card já foi virado, ele pode ser desvirado se estiver incorreto. Também verifica se os cards já foram encontrados
  const flipCard = (index: number) => {
    if (matchedCards.includes(index)) {
      return;
    }

    if(!flippedCards.includes(index)) {
      if(flippedCards.length === 1) {
        const firstIndex: number = flippedCards[0];
        const secondIndex: number = index;
        if(shuffledCards[firstIndex].id === shuffledCards[secondIndex].id) {
          setMatchedCards((prev) => [...prev, firstIndex, secondIndex])
        }
        setFlippedCards([...flippedCards, index]);
      } else if(flippedCards.length === 2) {
        setFlippedCards([index]);
      } else {
        setFlippedCards([...flippedCards, index])
      }
      setMoves(moves + 1);
    }
  }

  //Inicia a contagem de tempo no jogo
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!gameOver && matchedCards.length < 19) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if(matchedCards.length === 20) {
      finalTime
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [gameOver]);

  // Usar o valor de finalTime quando matchedCards.length for igual a 20
  const currentTime = finalTime !== null && matchedCards.length === 20 ? finalTime : time;

  // Atualizar o estado finalTime quando matchedCards.length for igual a 20
  useEffect(() => {
    if (matchedCards.length === 20) {
      setFinalTime(time);
      // Adicionar lógica adicional aqui, como exibir um modal de vitória
    }
  }, [matchedCards.length]);

  return (
    <main className="flex flex-col justify-between items-center h-screen">

        <div className="flex mt-3 text-3xl">
            <Link href="/games/gamesList">
                <BsArrowLeftCircle className="absolute top-0 left-0 mt-3 ml-3 text-3xl" />
            </Link>
            <GiCardPickup className="mt-1"/>
              <h1 className="mx-5">Memory Game</h1>
            <GiCardRandom className="mt-1"/>
        </div>

        {gameOver &&
          <PlayButton startGame={startGame} />
        }

        <div className={`grid grid-cols-4 lg:grid-cols-5 sm:grid-cols-4 gap-0.5`}>
          {!gameOver && shuffledCards.map((card, index: number) => {

            const isFlipped = flippedCards.includes(index);
            const isMatched = matchedCards.includes(index);

            return (
            <>
              <button 
                key={index}
                onClick={() => flipCard(index)}
                className={`${styles['flip-card']} ${isFlipped ? styles.flipped : ''} ${styles.card} ${styles['card-button']}`}
              >
                {isFlipped || isMatched ?
                  <>
                    <Image className="rounded-lg" src={card.image} alt={card.name} width={150} height={150} />
                  </>
                  :
                  <div className={`${styles['card']}`}/>
                }
              </button>
            </>
            );
          })}
        </div>

        {!gameOver && 
        <>
          <button className="mb-3 text-white bg-green-500 p-2 rounded-lg" onClick={restart}>Restart</button>

          <div className="flex text-lg mb-10">
            <h1>Moves: {moves}</h1>
            <h1 className="mx-10">Time: {currentTime}</h1>
            {matchedCards.length === 20 && <h1>Score: {((1 /((2 * moves) + currentTime)) * 1000).toFixed(1)}</h1>}
            
          </div>
        </>
        }
        
    </main>
  );
}