export interface Tile {
  id?: string;
  position: [number, number];
  value: number;
}

export type TileMap = Record<string, Tile>;
