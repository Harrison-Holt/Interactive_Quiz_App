import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const QuizPage = () => {
    const { state } = useLocation();
    const [questions, setQuestions] = useState(state?.questions || []);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        if (!questions.length) {
            // Handle case where questions are not passed or fetch them again if necessary
            // For now, let's assume the data always comes properly formatted.
            console.log('No questions passed to QuizPage, checking for a fallback.');
        }
        setUserAnswers(new Array(questions.length).fill(null));  // Initialize user answers with nulls
    }, [questions]);

    const handleAnswer = (selectedAnswer) => {
        const correctAnswer = questions[currentQuestionIndex].correct_answer;
        // Update user answers
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(updatedAnswers);

        // Update score if correct
        if (selectedAnswer === correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        // Move to next question or finish quiz
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    if (!questions.length) return <div>Loading questions...</div>;

    const currentQuestion = questions[currentQuestionIndex];
    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
                      .sort(() => Math.random() - 0.5);  // Randomize options display

    return (
        <div style={{ padding: '20px' }}>
            {!quizFinished ? (
                <div>
                    <h2>Question {currentQuestionIndex + 1}:</h2>
                    <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                    <ul style={{ listStyleType: 'none' }}>
                        {options.map((option, index) => (
                            <li key={index} style={{ margin: '10px 0', cursor: 'pointer' }}>
                                <button style={{ padding: '10px 20px' }} onClick={() => handleAnswer(option)}>
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h1>Quiz Completed</h1>
                    <p>Your Score: {score} out of {questions.length}</p>
                    {/* Optionally add a button to retry or go back */}
                </div>
            )}
        </div>
    );
};

export default QuizPage;

