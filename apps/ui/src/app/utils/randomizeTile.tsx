import { random } from 'lodash';

export const randomizeTile = (
  min: number = 0,
  max: number = 1,
  occupiedPositions: Set<string> = new Set()
): [number, number] => {
  let x, y;
  do {
    x = random(min, max);
    y = random(min, max);
  } while (occupiedPositions.has(`${x},${y}`));
  return [x, y];
};
