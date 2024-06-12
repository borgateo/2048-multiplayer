import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  DESKTOP_WIDTH,
  MOBILE_WIDTH,
  MERGE_ANIMATION_DURATION,
  GRID_SIZE,
} from "../constants";
import usePrevProps from "../hooks/use-prev-props";
import { TileStyled } from "./tile.styled";
import type { Tile as TileProps } from "./types";

export default function Tile({ position, value }: TileProps): JSX.Element {
  const isWideScreen = useMediaQuery({ minWidth: 512 });
  const containerWidth = isWideScreen ? DESKTOP_WIDTH : MOBILE_WIDTH;

  const [scale, setScale] = useState(1);
  const previousValue = usePrevProps<number>(value);
  const hasChanged = previousValue !== value;

  const positionToPixels = (pos: number): number =>
    (pos / GRID_SIZE) * containerWidth;

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => {
        setScale(1);
      }, MERGE_ANIMATION_DURATION);
    }
  }, [hasChanged]);

  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
    zIndex: value,
  };

  return (
    <TileStyled value={value} style={style}>
      {value}
    </TileStyled>
  );
}
