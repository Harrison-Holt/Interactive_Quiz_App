// TODO: Need to figure out why the api is not returning the values 
// ? 
export async function fetchQuizQuestions(num_questions, category, difficulty) {

    console.log(category); 
        const categoryMap = {
            "General Knowledge": 9,
            "Sports": 21,
            "History": 23,
            "Geography": 22,
            "Computer Science": 18
        };
    
    const categoryCode = categoryMap[category];
    console.log(categoryCode); 

    const apiDifficulty = difficulty.toLowerCase();
    const apiUrl = `https://opentdb.com/api.php?amount=${num_questions}&category=21&difficulty=${apiDifficulty}&type=multiple`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Response not OK');
        const data = await response.json();
        console.log(data.results); 
        return data.results; 
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error; 
    }
}

