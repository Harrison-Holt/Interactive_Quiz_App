import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    const categoryMap = {
        "General Knowledge": 9,
        "Entertainment: Books": 10,
        "Entertainment: Film": 11,
        "Entertainment: Music": 12,
        "Entertainment: Musicals & Theatres": 13,
        "Entertainment: Television": 14,
        "Entertainment: Video Games": 15,
        "Entertainment: Board Games": 16,
        "Science & Nature": 17,
        "Science: Computers": 18,
        "Science: Mathematics": 19,
        "Mythology": 20,
        "Sports": 21,
        "Geography": 22,
        "History": 23,
        "Politics": 24,
        "Art": 25,
        "Celebrities": 26,
        "Animals": 27
    };

    const [numQuestions, setNumQuestions] = useState(5);
    const [selectedCategoryId, setSelectedCategoryId] = useState(9); // Define selectedCategoryId state variable
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/quiz', { state: { numQuestions, category: selectedCategoryId } }); // Pass selectedCategoryId
    };

    return (
        <div className="homepage-container">
            <div className="quiz-box">
                <h1 className="quiz-title">Welcome to Trivia Quiz!</h1>
                <form onSubmit={handleSubmit} className="quiz-form">
                    <div className="form-group">
                        <label htmlFor='num_questions'>Number of Questions:</label>
                        <input
                            id='num_questions'
                            type='number'
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(parseInt(e.target.value, 10) || 5)}
                            min={5}
                            max={50}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='category-select'>Category:</label>
                        <select
                            id="category-select"
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(parseInt(e.target.value))}
                        >
                            {Object.entries(categoryMap).map(([categoryName, categoryId]) => (
                                <option key={categoryId} value={categoryId}>
                                    {categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="start-button">Start Quiz</button>
                </form>
            </div>
        </div>
    );
}

export default Homepage;


