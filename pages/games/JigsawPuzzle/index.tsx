'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import Link from 'next/link';

import axios, { AxiosResponse } from 'axios';
import { getRandomImage } from '../../api/rickAndMorty'
import Puzzle from '../../components/Puzzle/Puzzle';
import { splitImage } from '../../api/splitImage'

export default function JigsawPuzzle() {

  const [pieces, setPieces] = useState<object | unknown>([])
  const [completeImage, setCompleteImage] = useState<string>('');

  useEffect(() => {
    getImage();
  },[])

  const getImage = async () => {
    const fetchedImageUrl = await getRandomImage();
    if (typeof fetchedImageUrl === 'string') {
      setCompleteImage(fetchedImageUrl);
      console.log(fetchedImageUrl);
      splitImage(fetchedImageUrl)
        .then((images) => {
          setPieces(images);
        })
        .catch((error) => {
          // Lida com erros no carregamento da imagem
        });
    } else {
      // Lida com o caso em que a imagem não é retornada corretamente
      console.error('Erro ao obter a URL da imagem');
    }
  };

  return (
    <main className="flex flex-col justify-between items-center h-screen">

      <div className="flex mt-3 text-3xl">
            <Link href="/games/gamesList">
                <BsArrowLeftCircle className="absolute top-0 left-0 mt-3 ml-3 text-3xl" />
            </Link>
            <h1 className="mx-5">Jigsaw Puzzle</h1>
        </div>

        <div className='items-center text-center'>
          <h1 className='text-2xl mb-2'>Puzzle</h1>
          <Puzzle images={pieces as []} />
        </div>

        <div className='mb-5 text-center'>
          <h1 className='justify-center text-2xl mb-2'>Complete image</h1>
          <Image className='border-2 border-red-300' src={completeImage} alt='imagem completa' width={300} height={300}></Image>
        </div>

      

    </main>
  );
}