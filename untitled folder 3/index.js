const express = require("express");
const app = express();
const { Quiz, User } = require("./db");


const cors = require("cors");

app.use(cors());



app.use(express.json());

app.get("/", (req, res) => {
    Quiz.find({}, (error, quizzes) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        let allQuestions = [];
        for (let i = 0; i < quizzes.length; i++) {
          allQuestions = allQuestions.concat(quizzes[i]);
        }
        res.send(allQuestions);
      }
    });
  });


  app.post("/api/compareAnswers", (req, res) => {
    Quiz.findOne({ questions: { $elemMatch: { _id: req.body.questionId } } }, (error, quiz) => {
      if (error) {
        console.error(error);
        res.send({ error: "An error occurred while searching for the question." });
      } else {
        if (!quiz) {
          res.send({ error: "Question not found." });
        } else {
          let question = quiz.questions.find(question => question._id.toString() === req.body.questionId);
          if (!question) {
            res.send({ error: "Question not found." });
          } else {
            if (question.correctAnswer === req.body.answer) {
              res.send({ result: "Correct" });
            } else {
              res.send({ result: "Incorrect" });
            }
          }
        }
      }
    });
  });

app.get("/quiz", (req, res) => {
    const question = {
      text: req.body.text,
      answers: req.body.answers,
      correctAnswer: req.body.correctAnswer,
    };
    Quiz.findOneAndUpdate({ name: "Quiz 1" }, { $push: { questions: question } }, { new: true }, (error, quiz) => {
      if (error) {
        res.send(error);
      } else {
        res.send(quiz.questions);
      }
    });
  });

  app.get("/api/random-quiz", (req, res) => {
    Quiz.countDocuments({}, (error, count) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        let randomIndex = Math.floor(Math.random() * count);
        Quiz.findOne({}).skip(randomIndex).exec((error, quiz) => {
          if (error) {
            console.error(error);
            res.send(error);
          } else {
            let questionsWithoutCorrectAnswer = quiz.questions.map((question) => {
              let questionWithoutCorrectAnswer = { text: question.text, answers: question.answers ,id:question._id};
              return questionWithoutCorrectAnswer;
            });
            res.send(questionsWithoutCorrectAnswer);
          }
        });
      }
    });
  });

  

  app.get("/api/nice", (req, res) => {
    Quiz.find({}, (error, quizzes) => {
      if (error) {
        console.error(error);
        res.send(error);
      } else {
        let allQuestions = [];
        for (let i = 0; i < quizzes.length; i++) {
          allQuestions = allQuestions.concat(quizzes[i].questions);
        }
        res.send(allQuestions);
      }
    });
  });

  app.post("/api/questions", (req, res) => {
    const question = new Quiz({
      name: req.body.name,
      questions: [{
        text: req.body.text,
        answers: req.body.answers,
        correctAnswer: req.body.correctAnswer
      }]
    });
  
    question.save((error) => {
      if (error) {
        res.send(error);
      } else {
        res.send(question);
      }
    });
  });

app.listen(3000, () => {
  console.log("Quiz app listening on port 3000!");
});