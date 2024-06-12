import React, { useContext } from "react";
import { GameContext } from "../context/game-context";
import { Button } from "./restart.styled";

function Reset(): JSX.Element {
  const { resetGame, startGame } = useContext(GameContext);

  const handleClick = (): void => {
    resetGame();
    startGame();
  };

  return (
    <div>
      <Button onClick={handleClick}>Restart Game</Button>
    </div>
  );
}

export default Reset;
