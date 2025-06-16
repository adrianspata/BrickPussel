import React from "react";

type Props = {
  onClose: () => void;
  onReplay: () => void;
};

export const Modal: React.FC<Props> = ({ onClose, onReplay }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Grattis!</h2>
        <p>Du löste pusslet.</p>
        <div className="modal-buttons">
          <button onClick={onReplay} className="modal-button primary">Spela igen</button>
          <button onClick={onClose} className="modal-button">OK</button>
        </div>
      </div>
    </div>
  );
};
