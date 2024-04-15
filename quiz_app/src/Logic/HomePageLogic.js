// TODO: Need to figure out why the api is not returning the values 
// ? 
export async function fetchQuizQuestions(num_questions, category, difficulty) {

    if(category === "General Knowledge") {
        category = 9; 
    }
    else if (category === "Sports") {
        category = 21; 
    }
    else if(category === "History") {
        category = 23; 
    }
    else if(category === "Geography") {
        category = 22; 
    }
    else if (category === "Computer Science") {
        category = 18; 
    }
    
    const apiDifficulty = difficulty.toLowerCase();
    const apiUrl = `https://opentdb.com/api.php?amount=${num_questions}&category=${category}&difficulty=${difficulty}&type=multiple`;

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

