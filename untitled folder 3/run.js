const axios = require('axios');

async function postQuestion(question) {
  try {
    const res = await axios.post('http://localhost:3000/api/questions', question);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}

const questions = [  {    text: 'What is the capital of France?',    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Paris'
  },
  {
    text: 'What is the capital of Germany?',
    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Berlin'
  },
  {
    text: 'What is the capital of Italy?',
    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Rome'
  },
  {
    text: 'What is the capital of the United Kingdom?',
    answers: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'London'
  },
  {
    text: 'What is the capital of Spain?',
    answers: ['Paris', 'Madrid', 'Berlin', 'Rome'],
    correctAnswer: 'Madrid'
  },
  {
    text: 'What is the capital of Japan?',
    answers: ['Paris', 'Tokyo', 'Berlin', 'Rome'],
    correctAnswer: 'Tokyo'
  },
  {
    text: 'What is the capital of Russia?',
    answers: ['Paris', 'Moscow', 'Berlin', 'Rome'],
    correctAnswer: 'Moscow'
  },
  {
    text: 'What is the capital of China?',
    answers: ['Beijing', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Beijing'
  },
  {
    text: 'What is the capital of Australia?',
    answers: ['Canberra', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Canberra'
  },
  {
    text: 'What is the capital of Brazil?',
    answers: ['Brasília', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Brasília'
  },
];

questions.forEach(question => postQuestion(question));