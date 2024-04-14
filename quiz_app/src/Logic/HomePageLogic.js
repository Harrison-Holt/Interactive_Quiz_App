const categoryMapping = {
    "General Knowledge": 9,
    "Sports": 21,
    "History": 23,
    "Geography": 22,
    "Science: Computers": 18,
};

export async function fetchQuizQuestions(numQuestions, category, difficulty) {
    const apiCategory = categoryMapping[category];
    const apiDifficulty = difficulty.toLowerCase();
    const apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${apiCategory}&difficulty=${apiDifficulty}&type=multiple`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Response not OK');
        const data = await response.json();
        console.log(data); 
        return data.results; 
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error; 
    }
}

