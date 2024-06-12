import { describe, it, expect } from 'vitest';
import { randomizeTile } from './randomizeTile';

describe('randomizeTile', () => {
  it('should return a tuple with values within the range', () => {
    const [x, y] = randomizeTile(0, 10);
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThanOrEqual(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThanOrEqual(10);
  });

  it('should not return an occupied position', () => {
    const occupiedPositions = new Set(['1,1']);
    const [x, y] = randomizeTile(0, 2, occupiedPositions);
    expect(occupiedPositions.has(`${x},${y}`)).toBe(false);
  });

  it('should return a position when occupied positions cover some but not all of the area', () => {
    const occupiedPositions = new Set(['0,0', '0,1', '1,0']);
    const [x, y] = randomizeTile(0, 1, occupiedPositions);
    expect(occupiedPositions.has(`${x},${y}`)).toBe(false);
    expect([x, y]).toEqual([1, 1]);
  });

  it('should return the only free position if all other positions are occupied', () => {
    const occupiedPositions = new Set(['0,0', '0,1', '1,0']);
    const [x, y] = randomizeTile(0, 1, occupiedPositions);
    expect([x, y]).toEqual([1, 1]);
  });

  it('should handle cases where min and max are the same', () => {
    const [x, y] = randomizeTile(5, 5);
    expect([x, y]).toEqual([5, 5]);
  });

  it('should return different positions on consecutive calls if there are free positions available', () => {
    const occupiedPositions = new Set(['0,0']);
    const firstPosition = randomizeTile(0, 1, occupiedPositions);
    occupiedPositions.add(`${firstPosition[0]},${firstPosition[1]}`);
    const secondPosition = randomizeTile(0, 1, occupiedPositions);
    expect(firstPosition).not.toEqual(secondPosition);
  });

  it('should eventually return all possible positions', () => {
    const occupiedPositions = new Set() as Set<string>;
    const results = new Set();
    for (let i = 0; i < 25; i++) {
      const [x, y] = randomizeTile(0, 4, occupiedPositions);
      results.add(`${x},${y}`);
      occupiedPositions.add(`${x},${y}`);
    }
    expect(results.size).toBe(25);
  });
});
