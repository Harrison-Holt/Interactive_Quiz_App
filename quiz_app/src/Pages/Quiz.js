import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './quiz.css'; 

const TriviaComponent = () => {
    const { state } = useLocation();
    const [trivia, setTrivia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [answerError, setAnswerError] = useState(false);

    useEffect(() => {
        const fetchTrivia = async () => {
            const numQuestions = state?.numQuestions || 10;
            const categoryId = state?.category;

            if (!categoryId) {
                setError('No category selected');
                setLoading(false);
                return;
            }

            const url = `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryId}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch trivia questions. Status: ${response.status}`);
                }
                const data = await response.json();
                // Add a shuffled 'answers' array for each question
                const questionsWithShuffledAnswers = data.results.map((question) => ({
                    ...question,
                    answers: shuffleAnswers(question.correct_answer, question.incorrect_answers),
                }));
                setTrivia(questionsWithShuffledAnswers);
            } catch (error) {
                setError(`Failed to load trivia: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTrivia();
    }, [state?.numQuestions, state?.category]); 

    const shuffleAnswers = (correct, incorrect) => {
        const allAnswers = [correct, ...incorrect];
        return allAnswers.sort(() => Math.random() - 0.5);
    };

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        setAnswerError(false);
    };

    const handleNextQuestion = () => {
        if (!selectedAnswer) {
            setAnswerError(true);
            return;
        }
        const currentQuestion = trivia[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correct_answer;
        if (isCorrect) {
            setScore(score + 1);
        }
        setSelectedAnswer('');
        if (currentQuestionIndex < trivia.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowScore(true);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="trivia-container">
            {showScore ? (
                <div className="score-container">
                    <h1>Quiz Completed!</h1>
                    <p>Your Score: {score} out of {trivia.length}</p>
                    <button onClick={() => window.location.reload()} className="restart-button">Restart Quiz</button>
                    <h2>Questions with Correct Answers:</h2>
                    <ol className="questions-list">
                        {trivia.map((item, index) => (
                            <li key={index} className={`question-item ${!item.answeredCorrectly ? 'missed' : ''}`}>
                                <h3 dangerouslySetInnerHTML={{ __html: item.question }} />
                                {item.answeredCorrectly ? (
                                    <p className="answer-correct">Correct Answer: {item.correct_answer}</p>
                                ) : (
                                    <p className="answer-incorrect">Your Answer: {item.selected_answer}</p>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            ) : (
                <div className="question-container">
                    <h1>Question {currentQuestionIndex + 1}</h1>
                    <h2 dangerouslySetInnerHTML={{ __html: trivia[currentQuestionIndex].question }} className="question-text" />
                    {answerError && <p className="answer-error">Please select an answer before proceeding</p>}
                    <ul className="answers-list">
                        {trivia[currentQuestionIndex].answers.map((answer, index) => (
                            <li key={index} className="answer-item">
                                <button 
                                    onClick={() => handleAnswerSelection(answer)} 
                                    className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
                                >
                                    {answer}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextQuestion} className="next-button">Next Question</button>
                </div>
            )}
        </div>
    );
};

export default TriviaComponent;

