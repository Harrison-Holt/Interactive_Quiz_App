import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions } from '../Logic/HomePageLogic'; 

function Homepage() {
    const [num_questions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('Easy');
    const [category, setCategory] = useState('General Knowledge');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({num_questions, difficulty, category});

        try {
            const questions = await fetchQuizQuestions(num_questions, category, difficulty);
            console.log(questions);
            navigate('/quiz', { state: { questions, num_questions, category, difficulty } });  
        } catch (error) {
            console.error("Error fetching quiz questions:", error);
        }
    };


    

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh' 
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%', 
        maxWidth: '500px', 
        backgroundColor: 'tan', 

    };

    return (
        <div style={containerStyle}>
            <form id='form' onSubmit={handleSubmit} style={formStyle} >
                <label htmlFor='num_question'>Enter # of questions:</label>
                <input
                    id='num_question'
                    type='number'
                    required
                    value={num_questions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value, 10) || '')}
                    min={5} max={50}
                /><br/><br/>
                <label htmlFor='select_difficulty'>Select difficulty:</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                </select><br/><br/>
                <label htmlFor='select_category'>Select category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value='General Knownlegde'>General Knowledge</option>
                    <option value='Sports'>Sports</option>
                    <option value='History'>History</option>
                    <option value='Geography'>Geography</option>
                    <option value='Computer Science'>Computer Science</option>
                </select><br/><br/>
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
}

export default Homepage;

