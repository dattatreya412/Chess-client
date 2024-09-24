import React, { useState } from 'react'
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import axios from 'axios';

const GeneratePuzzle = () => {
    const [fen, setFen] = useState('');
    const [game, setGame] = useState(null);
    const [moves, setMoves] = useState([]);
    const [showBoard, setShowBoard] = useState(false);
    const [showMoves, setShowMoves] = useState(false);
    const [rating, setRating] = useState(1000);
    const [turn, setTurn] = useState('white');

    function onDrop(sourceSquare, targetSquare) {
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q' // always promote to queen for simplicity
            });
            if (move === null) return false; // illegal move
            
            const newMoves = [...moves, {
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q'
            }];
            setGame(new Chess(game.fen())); // update the game state
            setMoves(newMoves); // add the move to the moves array
            
            return true;
        } catch (error) {
            return false;
        }
    }

    function handleFenChange(event) {
        const newFen = event.target.value;
        setFen(newFen);
        setShowBoard(false);
        setShowMoves(false);
        setMoves([]);
    }

    function handleDisplayBoard() {
        try {
            const newGame = new Chess(fen);
            setGame(newGame);
            setShowBoard(true);
            setShowMoves(false);
            setMoves([]);
        } catch (error) {
            console.error("Invalid FEN:", error);
            alert("Invalid FEN. Please enter a valid FEN string.");
        }
    }

    function handleShowMoves() {
        setShowMoves(true);
    }

    function handleCopyMoves() {
        const movesString = JSON.stringify(moves);
        navigator.clipboard.writeText(movesString).then(() => {
            alert('Moves copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy moves: ', err);
        });
    }

    async function handleAddPuzzle() {
        if (!game || moves.length === 0) {
            alert('Please set up the board and make some moves first.');
            return;
        }

        const puzzleData = {
            gameboardPosition: fen,
            correctMoves: moves,
            turn: turn,
            rating: rating
        };

        try {
            const response = await axios.post('http://localhost:4000/puzzles', puzzleData);
            if (response.status === 201) {
                alert('Puzzle added successfully!');
            } else {
                alert('Failed to add puzzle. Please try again.');
            }
        } catch (error) {
            console.error('Error adding puzzle:', error);
            alert('Error adding puzzle. Please check the console for details.');
        }
    }

    async function handleAddDailyPuzzle() {
        if (!game || moves.length === 0) {
            alert('Please set up the board and make some moves first.');
            return;
        }

        const puzzleData = {
            gameboardPosition: fen,
            correctMoves: moves,
            turn: turn
        };

        try {
            const response = await axios.post('http://localhost:4000/dailyPuzzle/addPuzzle', puzzleData);
            if (response.status === 200) {
                alert('Daily puzzle added successfully!');
            } else {
                alert('Failed to add daily puzzle. Please try again.');
            }
        } catch (error) {
            console.error('Error adding daily puzzle:', error);
            alert('Error adding daily puzzle. Please check the console for details.');
        }
    }

    async function handleDeleteDailyPuzzle() {
        try {
            const response = await axios.delete('http://localhost:4000/dailyPuzzle/deletePuzzle');
            if (response.status === 200) {
                alert('Daily puzzle deleted successfully!');
            } else {
                alert('Failed to delete daily puzzle. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting daily puzzle:', error);
            alert('Error deleting daily puzzle. Please check the console for details.');
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input 
                        type="text" 
                        value={fen} 
                        onChange={handleFenChange} 
                        className="w-full mb-4 p-2 border rounded"
                        placeholder="Enter FEN"
                    />
                    <div className="mb-4">
                        <input 
                            type="number" 
                            value={rating} 
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                            placeholder="Enter puzzle rating"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mr-4">
                            <input 
                                type="radio" 
                                value="white" 
                                checked={turn === 'white'} 
                                onChange={() => setTurn('white')} 
                            /> White
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="black" 
                                checked={turn === 'black'} 
                                onChange={() => setTurn('black')} 
                            /> Black
                        </label>
                    </div>
                    <button 
                        onClick={handleDisplayBoard}
                        className="mb-4 p-2 bg-blue-500 text-white rounded w-full"
                    >
                        Display Board
                    </button>
                </div>
                <div>
                    {showBoard && game && (
                        <div>
                            <div className="w-full aspect-square mb-4">
                                <Chessboard
                                    position={game.fen()}
                                    onPieceDrop={onDrop}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button 
                                    onClick={handleShowMoves}
                                    className="p-2 bg-green-500 text-white rounded flex-grow"
                                >
                                    Show Moves
                                </button>
                                <button 
                                    onClick={handleCopyMoves}
                                    className="p-2 bg-yellow-500 text-white rounded flex-grow"
                                >
                                    Copy Moves
                                </button>
                                <button 
                                    onClick={handleAddPuzzle}
                                    className="p-2 bg-purple-500 text-white rounded flex-grow"
                                >
                                    Add Puzzle to Database
                                </button>
                                <button 
                                    onClick={handleAddDailyPuzzle}
                                    className="p-2 bg-red-500 text-white rounded flex-grow"
                                >
                                    Add Daily Puzzle
                                </button>
                                <button 
                                    onClick={handleDeleteDailyPuzzle}
                                    className="p-2 bg-orange-500 text-white rounded flex-grow"
                                >
                                    Delete Daily Puzzle
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showMoves && moves.length > 0 && (
                <div className="mt-4">
                    <h3>Moves:</h3>
                    <ul className="list-disc pl-5">
                        {moves.map((move, index) => (
                            <li key={index}>
                                {JSON.stringify(move)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default GeneratePuzzle