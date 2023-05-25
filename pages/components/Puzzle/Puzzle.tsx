import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import styles from './puzzle.module.css';

interface PuzzleProps {
  images: [];
}

const Puzzle: React.FC<PuzzleProps> = ({ images }) => {
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    const shuffledTiles = shuffleTiles(images.length);
    setTiles(shuffledTiles);
  }, [images]);

  const shuffleTiles = (length: number) => {
    const shuffledArray = Array.from({ length }, (_, index) => index + 1);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleTileClick = (clickedTile: number) => {
    const emptyTileIndex = tiles.findIndex((tile) => tile === images.length);
    const clickedTileIndex = tiles.findIndex((tile) => tile === clickedTile);

    if (isValidMove(emptyTileIndex, clickedTileIndex)) {
      const newTiles = [...tiles];
      [newTiles[emptyTileIndex], newTiles[clickedTileIndex]] = [
        newTiles[clickedTileIndex],
        newTiles[emptyTileIndex],
      ];
      setTiles(newTiles);
    }
  };

  const isValidMove = (emptyTileIndex: number, clickedTileIndex: number) => {
    return (
      (emptyTileIndex === clickedTileIndex - 1 && emptyTileIndex % 3 !== 2) || // movimento para a esquerda
      (emptyTileIndex === clickedTileIndex + 1 && emptyTileIndex % 3 !== 0) || // movimento para a direita
      emptyTileIndex === clickedTileIndex - 3 || // movimento para cima
      emptyTileIndex === clickedTileIndex + 3 // movimento para baixo
    );
  };

  return (
    <div className={styles.puzzle}>
      {tiles.map((tile) => {
        if (tile === images.length) {
          // Renderiza o último Tile vazio
          return <Tile key={tile} value={tile} onClick={handleTileClick} />;
        } else {
          // Renderiza os Tiles com as imagens correspondentes
          return (
            <Tile key={tile} value={tile} image={images[tile - 1]} onClick={handleTileClick} />
          );
        }
      })}
    </div>
  );
};

export default Puzzle;