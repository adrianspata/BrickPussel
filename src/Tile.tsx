import React from "react";

type Props = {
  value: number;
  onClick: () => void;
};

export const Tile: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button className={`tile ${value === 0 ? "empty" : ""}`} onClick={onClick} disabled={value === 0}>
      {value !== 0 && value}
    </button>
  );
};
