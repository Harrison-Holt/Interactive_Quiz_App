import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    const [num_questions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('easy');
    const [category, setCategory] = useState('General Knowledge');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ num_questions, difficulty, category });

        try {
            navigate('/quiz', { state: { num_questions, category, difficulty } });
        } catch (error) {
            console.error("Error fetching quiz questions:", error);
        }
    };

    return (
        <div className="container">
            <form id='form' onSubmit={handleSubmit} className="form">
                <label htmlFor='num_question'>Enter # of questions:</label>
                <input
                    id='num_question'
                    type='number'
                    required
                    value={num_questions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value, 10) || '')}
                    min={5} max={50}
                /><br /><br />
                <label htmlFor='select_difficulty'>Select difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select><br /><br />
                <label htmlFor='select_category'>Select category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value='General Knowledge'>General Knowledge</option>
                    <option value='Sports'>Sports</option>
                    <option value='History'>History</option>
                    <option value='Geography'>Geography</option>
                    <option value='Computer Science'>Computer Science</option>
                </select><br /><br />
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
}

export default Homepage;


