import React from 'react';

// Custom icon themes for the chessboard
const iconThemes = {
    default: {
      wP: '♙', wN: '♘', wB: '♗', wR: '♖', wQ: '♕', wK: '♔',
      bP: '♟', bN: '♞', bB: '♝', bR: '♜', bQ: '♛', bK: '♚'
    },
    minimalist: {
      wP: '🅟', wN: '🅝', wB: '🅑', wR: '🅡', wQ: '🅠', wK: '🅚',
      bP: '🅟', bN: '🅝', bB: '🅑', bR: '🅡', bQ: '🅠', bK: '🅚'
    },
    '3d': {
      wP: '♙', wN: '♘', wB: '♗', wR: '♖', wQ: '♕', wK: '♔',
      bP: '♟', bN: '♞', bB: '♝', bR: '♜', bQ: '♛', bK: '♚'
    },
    pixel: {
      wP: '▓', wN: '▒', wB: '░', wR: '█', wQ: '▒', wK: '░',
      bP: '▓', bN: '▒', bB: '░', bR: '█', bQ: '▒', bK: '░'
    }
  };
  

// Function to apply the selected icon theme
const applyIconTheme = (theme) => {
  const selectedTheme = iconThemes[theme] || iconThemes.default;
  
  const createPieceComponent = (piece) => ({ squareWidth }) => (
    <div
      style={{
        width: squareWidth,
        height: squareWidth,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: `${squareWidth * 0.8}px`,
        color: piece.charAt(0) === 'w' ? 'white' : 'black',
      }}
    >
      {selectedTheme[piece]}
    </div>
  );

  const pieces = {};
  Object.keys(selectedTheme).forEach(piece => {
    pieces[piece] = createPieceComponent(piece);
  });

  return { pieces };
};

export { iconThemes, applyIconTheme };
