
interface PlayButtonProps {
  startGame: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  startGame
}) => {
  return (
    <div>
      <button className="
        text-3xl 
        bg-green-300 
        p-4 
        border-white 
        border-2
        rounded-lg 
        transition 
        duration-300 
        ease-in-out 
        hover:border-black 
        hover:opacity-80" 
      onClick={() => {startGame()}}>Start Game</button>
    </div>
  )
}

export default PlayButton