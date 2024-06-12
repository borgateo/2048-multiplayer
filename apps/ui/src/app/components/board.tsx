import { useCallback, useContext, useEffect, useRef } from "react";
import { GameContext } from "../context/game-context";
import { ActionType } from "../reducers/game-reducer";
import { GRID_SIZE } from "../constants";
import Tile from "./tile";
import { BoardContainer, Cell, Grid, TilesContainer } from "./board.styled";
import type { Tile as TileProps } from "./types";

export default function Board(): JSX.Element {
  const { getTiles, moveTiles, startGame } = useContext(GameContext);
  const initialized = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // disables page scrolling with keyboard arrows
      e.preventDefault();

      switch (e.code) {
        case "ArrowUp":
          moveTiles(ActionType.MOVE_UP);
          break;
        case "ArrowDown":
          moveTiles(ActionType.MOVE_DOWN);
          break;
        case "ArrowLeft":
          moveTiles(ActionType.MOVE_LEFT);
          break;
        case "ArrowRight":
          moveTiles(ActionType.MOVE_RIGHT);
          break;
      }
    },
    [moveTiles]
  );

  const renderGrid = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = GRID_SIZE * GRID_SIZE;

    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(<Cell key={index} />);
    }

    return cells;
  };

  const renderTiles = () => {
    return getTiles().map((tile: TileProps) => (
      <Tile key={`${tile.id}`} {...tile} />
    ));
  };

  useEffect(() => {
    if (initialized.current === false) {
      startGame();
      initialized.current = true;
    }
  }, [startGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <BoardContainer>
      <TilesContainer>{renderTiles()}</TilesContainer>
      <Grid>{renderGrid()}</Grid>
    </BoardContainer>
  );
}
