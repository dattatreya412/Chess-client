import React, { useState } from 'react';
import axios from 'axios';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const GenerateLesson = () => {
    const [lessonData, setLessonData] = useState({
        lessonImg: '',
        lessonTitle: '',
        lessonContent: '',
        lessonGuide: [{ from: '', to: '', promotion: '', correct: '', wrong: '' }]
    });
    const [game, setGame] = useState(new Chess());
    const [currentGuideStep, setCurrentGuideStep] = useState(0);
    console.log(lessonData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLessonData({ ...lessonData, [name]: value });
    };

    const handleGuideInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedGuide = [...lessonData.lessonGuide];
        updatedGuide[index][name] = value;
        setLessonData({ ...lessonData, lessonGuide: updatedGuide });
    };

    const addGuideStep = () => {
        setLessonData({
            ...lessonData,
            lessonGuide: [...lessonData.lessonGuide, { from: '', to: '', promotion: '', correct: '', wrong: '' }]
        });
        setCurrentGuideStep(lessonData.lessonGuide.length);
    };

    const removeGuideStep = (index) => {
        const updatedGuide = lessonData.lessonGuide.filter((_, i) => i !== index);
        setLessonData({ ...lessonData, lessonGuide: updatedGuide });
        setCurrentGuideStep(Math.max(0, currentGuideStep - 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/lesson', lessonData);
            if (response.status === 201) {
                alert('Lesson added successfully!');
                setLessonData({
                    lessonImg: '',
                    lessonTitle: '',
                    lessonContent: '',
                    lessonGuide: [{ from: '', to: '', promotion: '', correct: '', wrong: '' }]
                });
                setGame(new Chess());
                setCurrentGuideStep(0);
            }
        } catch (error) {
            console.error('Error adding lesson:', error);
            alert('Error adding lesson. Please try again.');
        }
    };

    const onDrop = (sourceSquare, targetSquare) => {
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q' // always promote to queen for simplicity
            });

            if (move === null) return false;

            setGame(new Chess(game.fen()));
            
            // Update the current guide step
            const updatedGuide = [...lessonData.lessonGuide];
            updatedGuide[currentGuideStep] = {
                ...updatedGuide[currentGuideStep],
                from: sourceSquare,
                to: targetSquare,
                promotion: move.promotion || ''
            };
            setLessonData({ ...lessonData, lessonGuide: updatedGuide });

            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Generate Lesson</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="lessonImg"
                    value={lessonData.lessonImg}
                    onChange={handleInputChange}
                    placeholder="Lesson Image URL"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="lessonTitle"
                    value={lessonData.lessonTitle}
                    onChange={handleInputChange}
                    placeholder="Lesson Title"
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="lessonContent"
                    value={lessonData.lessonContent}
                    onChange={handleInputChange}
                    placeholder="Lesson Content"
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                />
                <h3 className="text-xl font-semibold">Lesson Guide</h3>
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
                    </div>
                    <div className="w-full md:w-1/2 space-y-2 max-h-96 overflow-y-auto">
                        {lessonData.lessonGuide.map((step, index) => (
                            <div key={index} className={`p-4 border rounded ${index === currentGuideStep ? 'bg-blue-100' : ''}`}>
                                <p>From: {step.from}</p>
                                <p>To: {step.to}</p>
                                <p>Promotion: {step.promotion}</p>
                                <input
                                    type="text"
                                    name="correct"
                                    value={step.correct}
                                    onChange={(e) => handleGuideInputChange(e, index)}
                                    placeholder="Correct Message"
                                    className="w-full p-2 border rounded mt-2"
                                    required
                                />
                                <input
                                    type="text"
                                    name="wrong"
                                    value={step.wrong}
                                    onChange={(e) => handleGuideInputChange(e, index)}
                                    placeholder="Wrong Message"
                                    className="w-full p-2 border rounded mt-2"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeGuideStep(index)}
                                    className="bg-red-500 text-white p-2 rounded mt-2"
                                >
                                    Remove Step
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={addGuideStep}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    Add Guide Step
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Submit Lesson
                </button>
            </form>
        </div>
    );
};

export default GenerateLesson;
