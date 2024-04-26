import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate(); 
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    // Function to fetch questions from the API
    const fetchQuestions = async (num_questions, category) => {
        const categoryMap = {
            "Art & Literature": "artliterature",
            "Language": "language",
            "Science & Nature": "sciencenature",
            "General": "general",
            "Food & Drink": "fooddrink",
            "People & Places": "peopleplaces",
            "Geography": "geography",
            "History & Holidays": "historyholidays",
            "Entertainment": "entertainment",
            "Toys & Games": "toysgames",
            "Music": "music",
            "Mathematics": "mathematics",
            "Religion & Mythology": "religionmythology",
            "Sports & Leisure": "sportsleisure"
        };
        
        const categoryCode = categoryMap[category] || "general"; 
    const apiUrl = `https://api.api-ninjas.com/v1/trivia?limit=${num_questions}&category=${categoryCode}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Api-Key': 'Yvk4eNG2JLCJ5yGmJounqA==UOBJGJvJs8xcwlLt'  
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch the quiz questions.');
        }
        const data = await response.json();
        return data; // Adjust this part if the data structure requires it
    } catch (error) {
        console.error("Error fetching questions from API:", error);
        return [];
    }
    };

    useEffect(() => {
        initializeQuiz();
    }, [state]);

    const initializeQuiz = async () => {
        if (state) {
            const { num_questions, category} = state;
            const newQuestions = await fetchQuestions(num_questions, category);
            setQuestions(newQuestions);
            setUserAnswers(new Array(newQuestions.length).fill(null));
            setCurrentQuestionIndex(0);
            setScore(0);
            setQuizFinished(false);
        }
    };


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

    const handlePlayAgain = () => {
        navigate('/'); // Navigate to the homepage
    };

    if (!questions.length) return <div>Loading questions...</div>;

    const currentQuestion = questions[currentQuestionIndex];
    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);

    return (
        <div style={{ padding: '20px', paddingTop: '60px' }}> {/* Adjusted padding to lower the content */}
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
                    <button onClick={handlePlayAgain} style={{ padding: '10px 20px', marginTop: '20px' }}>Play Again</button>
                </div>
            )}
        </div>
    );
};
export default QuizPage;
