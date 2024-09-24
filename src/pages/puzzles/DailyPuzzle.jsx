import React, { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { handleMove } from '../../BoardToolBox/handlePuzzle'

const DailyPuzzle = () => {
  const [puzzleData, setPuzzleData] = useState(null)
  const [game, setGame] = useState(new Chess())
  const [boardFen, setBoardFen] = useState('')
  const [presentMoveCount, setPresentMoveCount] = useState(0)
  const [puzzleStatus, setPuzzleStatus] = useState('ongoing') // 'ongoing', 'correct', 'wrong'

  useEffect(() => {
    const fetchPuzzleData = async () => {
      try {
        const response = await fetch('http://localhost:4000/dailypuzzle/getPuzzle')
        if (!response.ok) {
          throw new Error('Failed to fetch puzzle data')
        }
        const data = await response.json()
        setPuzzleData(data)
        // Initialize the game with the puzzle position
        const newGame = new Chess(data.gameboardPosition)
        setGame(newGame)
        setBoardFen(newGame.fen())
      } catch (error) {
        console.error('Error fetching puzzle data:', error)
      }
    }

    fetchPuzzleData()
  }, [])

  const onDrop = (sourceSquare, targetSquare) => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to queen for simplicity
    }

    handleMove(
      game,
      move,
      puzzleData.correctMoves,
      setBoardFen,
      setPresentMoveCount,
      presentMoveCount,
      handlePuzzleComplete,
      puzzleData.rating
    )
  }

  const handlePuzzleComplete = (result, rating) => {
    setPuzzleStatus(result)
    // You can add more logic here, like updating user score
  }

  if (!puzzleData) {
    return (
      <div className="flex justify-center items-center h-[95vh] bg-gray-100">
        <div className="text-2xl font-bold text-gray-700 animate-pulse">
          Loading puzzle...
        </div>
      </div>
    )
  }

  return (
    <div className="daily-puzzle-container bg-gray-100 h-[95vh] flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="puzzle-title text-2xl font-bold text-center py-3 bg-blue-600 text-white">
          Daily Chess Puzzle
        </h1>
        <div className="p-4 flex flex-col h-[calc(95vh-3rem)]">
          <div className="puzzle-info flex justify-between mb-2 text-sm">
            <p className="font-semibold">Rating: <span className="text-blue-600">{puzzleData.rating}</span></p>
            <p className="font-semibold">Turn: <span className="text-green-600">{puzzleData.turn === 'white' ? 'White' : 'Black'} to move</span></p>
          </div>
          <div className="chessboard-container mx-auto w-full max-w-md flex-grow flex items-center justify-center">
            <Chessboard 
              position={boardFen} 
              onPieceDrop={onDrop}
              boardOrientation={puzzleData.turn === 'white' ? 'white' : 'black'}
              customBoardStyle={{
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>
          <div className="puzzle-progress mt-4">
            <div className="flex justify-between items-center mb-1 text-sm">
              <p className="font-semibold">Progress:</p>
              <p className="font-semibold">{presentMoveCount} / {puzzleData.correctMoves.length} moves</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{width: `${(presentMoveCount / puzzleData.correctMoves.length) * 100}%`}}
              ></div>
            </div>
            {puzzleStatus === 'ongoing' && (
              <p className="puzzle-hint text-center mt-2 text-sm text-yellow-600 font-semibold">Make the best move!</p>
            )}
            {puzzleStatus === 'correct' && (
              <p className="puzzle-success text-center mt-2 text-sm text-green-600 font-semibold">Puzzle solved correctly! Well done!</p>
            )}
            {puzzleStatus === 'wrong' && (
              <p className="puzzle-failure text-center mt-2 text-sm text-red-600 font-semibold">Incorrect move. Don't give up, try again!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyPuzzle