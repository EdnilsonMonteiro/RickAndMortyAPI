import React from 'react';
import styles from './puzzle.module.css';
import Image from 'next/image';

interface TileProps {
  value: number;
  onClick: (value: number) => void;
  image?:{
    id: number | string;
    image: string;
  };
}

const Tile: React.FC<TileProps> = ({ value, onClick, image }) => {
  const handleClick = () => {
    onClick(value);
  };

  const tileClassName = value === 9 ? `${styles.tile} ${styles.empty}` : styles.tile;

  return (
    <div className={tileClassName} onClick={handleClick}>
      {image && (
        <Image 
        alt={String(image.id)} 
        src={image.image} 
        width={100} 
        height={100} 
        onClick={handleClick} />
      )}
    </div>
  );
};

export default Tile;