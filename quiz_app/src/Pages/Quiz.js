import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access navigation state

const TriviaComponent = () => {
    const { state } = useLocation(); // Get the passed state from the location object
    const [trivia, setTrivia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrivia = async () => {
            const category = state?.category || 'mathematics'; // Use the passed category or default to 'mathematics'
            const url = `https://api.api-ninjas.com/v1/trivia?category=${category}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': 'Yvk4eNG2JLCJ5yGmJounqA==UOBJGJvJs8xcwlLt',
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

        if (state?.category) {
            fetchTrivia();
        } else {
            setLoading(false);
            setError('No category selected');
        }
    }, [state?.category]); // React to changes in the category passed via state

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{state?.category ? `${state.category} Trivia Questions` : 'Trivia Questions'}</h1>
            {trivia.length > 0 ? (
                <ul>
                    {trivia.map((item, index) => (
                        <li key={index}>
                            <h2 dangerouslySetInnerHTML={{ __html: item.question }}></h2>
                            <p>Answer: {item.answer}</p>
                        </li>
                    ))}
                </ul>
            ) : <p>No trivia questions found.</p>}
        </div>
    );
};

export default TriviaComponent;


