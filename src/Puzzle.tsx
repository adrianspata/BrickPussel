import React, { useState, useEffect } from "react";
import { Tile } from "./Tile";
import { Modal } from "./Modal";
import { generateShuffledTiles, isSolved } from "./utils";
import { ROWS, COLS } from "./config";

const getIndex = (row: number, col: number) => row * COLS + col;

export const Puzzle: React.FC = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    shuffleTiles();
  }, []);

  const shuffleTiles = () => {
    const shuffled = generateShuffledTiles(ROWS, COLS);
    setTiles(shuffled);
    setShowModal(false);
    setError(false);
  };

  const solvePuzzle = () => {
    const total = ROWS * COLS;
    const targetTiles = [...Array(total - 1).keys()].map(i => i + 1);
    targetTiles.push(0);

    let step = 0;
    const interval = setInterval(() => {
      setTiles(prev => {
        const updated = [...prev];
        if (step >= targetTiles.length) {
          clearInterval(interval);
          setShowModal(true);
          return targetTiles;
        }
        updated[step] = targetTiles[step];
        step++;
        return updated;
      });
    }, 100); 
  };

  const handleClick = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    const emptyRow = Math.floor(emptyIndex / COLS);
    const emptyCol = emptyIndex % COLS;

    const newTiles = [...tiles];

    if (row === emptyRow && col !== emptyCol) {
      const direction = col < emptyCol ? 1 : -1;

      if (!((direction === 1 && col < emptyCol) || (direction === -1 && col > emptyCol))) {
        triggerError();
        return;
      }

      for (let c = emptyCol; c !== col; c -= direction) {
        newTiles[getIndex(row, c)] = newTiles[getIndex(row, c - direction)];
      }
      newTiles[getIndex(row, col)] = 0;
    } else if (col === emptyCol && row !== emptyRow) {
      const direction = row < emptyRow ? 1 : -1;

      if (!((direction === 1 && row < emptyRow) || (direction === -1 && row > emptyRow))) {
        triggerError();
        return;
      }

      for (let r = emptyRow; r !== row; r -= direction) {
        newTiles[getIndex(r, col)] = newTiles[getIndex(r - direction, col)];
      }
      newTiles[getIndex(row, col)] = 0;
    } else {
      triggerError();
      return;
    }

    setTiles(newTiles);
    const solvedNow = isSolved(newTiles);
    if (solvedNow) {
      setShowModal(true);
    }
  };

  const triggerError = () => {
    setError(true);
    setTimeout(() => setError(false), 300);
  };

  return (
    <div className="puzzle-container">
      <div className={`grid-wrapper ${error ? "error" : ""}`}>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {tiles.map((value, index) => (
            <Tile key={index} value={value} onClick={() => handleClick(index)} />
          ))}
        </div>
      </div>

      <div className="controls">
        <button className="shuffle" onClick={shuffleTiles}>Slumpa</button>
      </div>

      <div className="cheat-link-wrapper">
        <span className="cheat-link" onClick={solvePuzzle}>(Fuska)</span>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onReplay={() => {
            shuffleTiles();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};
