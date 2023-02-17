const axios = require('axios');

const compareAnswers = async (questionId, answer) => {
  try {
    const res = await axios.post('http://localhost:3000/api/compareAnswers', {
      questionId,
      answer
    });
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

// Usage
const questionId = "63ea87ebe4762a7950832c32";
const answer = "Madrid";
compareAnswers(questionId, answer);
