import React, { useState, useEffect } from 'react';

const TriviaComponent = () => {
    const [trivia, setTrivia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrivia = async () => {
            const category = 'mathematics'; // Set the category here, or this can be dynamic
            const url = `https://api.api-ninjas.com/v1/trivia?category=${category}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': 'YOUR_API_KEY', // Replace 'YOUR_API_KEY' with your actual API key
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch trivia questions. Status: ' + response.status);
                }

                const data = await response.json();
                setTrivia(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load trivia: ' + error.message);
                setLoading(false);
            }
        };

        fetchTrivia();
    }, []); // Empty dependency array means this effect runs only once after the initial render

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Mathematics Trivia Questions</h1>
            {trivia.length > 0 ? (
                <ul>
                    {trivia.map((item, index) => (
                        <li key={index}>
                            <h2>{item.question}</h2>
                            <p>Answer: {item.answer}</p>
                        </li>
                    ))}
                </ul>
            ) : <p>No trivia questions found.</p>}
        </div>
    );
};

export default TriviaComponent;

