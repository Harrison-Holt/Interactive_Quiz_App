import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TriviaComponent = () => {
    const { state } = useLocation();
    const [trivia, setTrivia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Utility function to shuffle answers
    const shuffleAnswers = (correct, incorrect) => {
        const allAnswers = [correct, ...incorrect];
        return allAnswers.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const fetchTrivia = async () => {
            const numQuestions = state?.numQuestions || 10;
            const categoryId = state?.category; // This should be the numerical ID

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
    }, [state?.numQuestions, state?.category]); // React to changes in either numQuestions or category

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Trivia Questions</h1>
            {trivia.length > 0 ? (
                <ol>
                    {trivia.map((item, index) => (
                        <li key={index}>
                            <h2 dangerouslySetInnerHTML={{ __html: item.question }} />
                            <ul>
                                {item.answers.map((answer, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: answer }} />
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            ) : <p>No trivia questions found.</p>}
        </div>
    );
};

export default TriviaComponent;



