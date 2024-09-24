// Custom themes for the chessboard
const boardThemes = {
  default: {
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    border: '#8b4513',
  },
  wood: {
    lightSquare: '#deb887',
    darkSquare: '#8b4513',
    border: '#4a2600',
  },
  marble: {
    lightSquare: '#f0f0f0',
    darkSquare: '#999999',
    border: '#666666',
  },
  neon: {
    lightSquare: '#39ff14',
    darkSquare: '#ff00ff',
    border: '#00ffff',
  },
};

// Function to apply the selected theme
const applyBoardTheme = (theme) => {
  const selectedTheme = boardThemes[theme] || boardThemes.default;
  return {
    boardStyle: {
      borderRadius: '5px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    },
    lightSquareStyle: { backgroundColor: selectedTheme.lightSquare },
    darkSquareStyle: { backgroundColor: selectedTheme.darkSquare },
    borderStyle: { borderColor: selectedTheme.border },
  };
};

export { boardThemes, applyBoardTheme };
