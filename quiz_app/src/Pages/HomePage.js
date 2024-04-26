import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; 


function Homepage() {
    const [numQuestions, setNumQuestions] = useState(5);
    const [category, setCategory] = useState('general');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            navigate('/quiz', { state: { numQuestions, category } });  
        } catch (error) {
            console.error("Error navigating to quiz:", error);
        }
    };

    return (
        <div className="homepage-container">
            <div className="quiz-box">
                <h1 className="quiz-title">Welcome to Travia Quiz!</h1>
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
                        <label htmlFor='category'>Category:</label>
                        <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="artliterature">Art & Literature</option>
                            <option value="language">Language</option>
                            <option value="sciencenature">Science & Nature</option>
                            <option value="general">General</option>
                            <option value="fooddrink">Food & Drink</option>
                            <option value="peopleplaces">People & Places</option>
                            <option value="geography">Geography</option>
                            <option value="historyholidays">History & Holidays</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="toysgames">Toys & Games</option>
                            <option value="music">Music</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="religionmythology">Religion & Mythology</option>
                            <option value="sportsleisure">Sports & Leisure</option>
                        </select>
                    </div>
                    <button type="submit" className="start-button">Start Quiz</button>
                </form>
            </div>
        </div>
    );
}

export default Homepage;

