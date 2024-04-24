import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import CSS file

function Homepage() {
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('easy');
    const [category, setCategory] = useState('General Knowledge');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            navigate('/quiz', { state: { numQuestions, category, difficulty } });
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
                            onChange={(e) => setNumQuestions(parseInt(e.target.value, 10) || '')}
                            min={5}
                            max={50}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='difficulty'>Difficulty:</label>
                        <select id='difficulty' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='category'>Category:</label>
                        <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value='General Knowledge'>General Knowledge</option>
                            <option value='Sports'>Sports</option>
                            <option value='History'>History</option>
                            <option value='Geography'>Geography</option>
                            <option value='Computer Science'>Computer Science</option>
                        </select>
                    </div>
                    <button type="submit">Start Quiz</button>
                </form>
            </div>
        </div>
    );
}

export default Homepage;



