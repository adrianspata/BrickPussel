# 15 Puzzle

This is a web-based implementation of the classic 15 puzzle, built with React and TypeScript. The puzzle is generalized to support any number of rows and columns, making it more flexible than the traditional 4x4 setup.

## Features
- Responsive layout (mobile, tablet, desktop)

- Tiles are numbered from 1 to N, with one empty space

- Tiles can be moved if they are in the same row or column as the empty space

- Initially shuffled order

- "Shuffle" button to randomize the puzzle

- Invalid moves trigger visual feedback with a red shake animation

- A popup message is displayed when the puzzle is solved

- A discreet "(cheat)" link solves the puzzle visually and quickly

## Installation
```bash
npm install
npm run dev -- --host
```
Then visit http://localhost:5173 or your computer’s local IP address from another device.

## Tech
- React

- TypeScript

- Vite

- CSS 

- Google Fonts 

## Structure
- Puzzle.tsx - main game logic component

- Tile.tsx - individual tile component

- Modal.tsx - popup for win message

- utils.ts - helper functions for puzzle logic

- config.ts - adjust number of rows and columns
  