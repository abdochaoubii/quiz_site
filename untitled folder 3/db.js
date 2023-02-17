const mongoose = require("mongoose");


const link = 'mongodb+srv://malki:NGALEOT9ts7Od0F6@cluster0.z7izxln.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(link, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((reselt)=>console.log("connected to db"))
    .catch((error)=>console.log(error));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB!");
});

const quizSchema = new mongoose.Schema({
  name: String,
  questions: [{
    id: Number,
    text: String,
    answers: [String],
    correctAnswer: String
  }]
});

const Quiz = mongoose.model("Quiz", quizSchema);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  quizzesTaken: [{
    quizId: mongoose.Types.ObjectId,
    score: Number
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = { Quiz, User };