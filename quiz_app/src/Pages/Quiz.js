import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const QuizPage = () => {
    const { state } = useLocation();
    const [questions, setQuestions] = useState(state?.questions || []);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    // Function to fetch questions from the API
    const fetchQuestions = async (num_questions, category, difficulty) => {
        const apiUrl = `https://opentdb.com/api.php?amount=${num_questions}&category=${category}&difficulty=${difficulty}&type=multiple`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch the quiz questions.');
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Error fetching questions from API:", error);
            return []; // Return an empty array as a fallback
        }
    };

    useEffect(() => {
        const initializeQuiz = async () => {
            if (!questions.length) {
                const newQuestions = await fetchQuestions(); // Use default parameters or modify as needed
                setQuestions(newQuestions);
                setUserAnswers(new Array(newQuestions.length).fill(null));
            } else {
                setUserAnswers(new Array(questions.length).fill(null)); // Initialize user answers with nulls if questions are already there
            }
        };
        initializeQuiz();
    }, [questions]);

    const handleAnswer = (selectedAnswer) => {
        const correctAnswer = questions[currentQuestionIndex].correct_answer;
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(updatedAnswers);

        if (selectedAnswer === correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    if (!questions.length) return <div>Loading questions...</div>;

    const currentQuestion = questions[currentQuestionIndex];
    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);

    return (
        <div style={{ padding: '20px' }}>
            {!quizFinished ? (
                <div>
                    <h2>Question {currentQuestionIndex + 1}:</h2>
                    <h3 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                    <ul style={{ listStyle type: 'none' }}>
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
                </div>
            )}
        </div>
    );
};

export default QuizPage;


