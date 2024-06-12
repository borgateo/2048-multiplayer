import { useContext } from "react";
import { GameContext } from "../context/game-context";
import { ScoreContainer, ScoreValue, GameOver } from "./score.styled";

export default function Score(): JSX.Element {
  const { score, isGameOver } = useContext(GameContext);

  return (
    <ScoreContainer>
      Score
      <ScoreValue>{score}</ScoreValue>
      {isGameOver && <GameOver>Game Over!</GameOver>}
    </ScoreContainer>
  );
}
