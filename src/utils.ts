export const generateShuffledTiles = (rows: number, cols: number): number[] => {
  const total = rows * cols;
  const tiles = [...Array(total - 1).keys()].map((i) => i + 1);
  tiles.push(0);

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
};

export const isSolved = (tiles: number[]): boolean => {
  const last = tiles.length - 1;
  for (let i = 0; i < last; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[last] === 0;
};
