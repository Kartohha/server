const express = require('express')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // установите значение равным источнику клиента
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const URL= "mongodb+srv://Userrrrr:N4cb7lC9iGnyKxyK@cluster0.5q7gm0m.mongodb.net/PROFILE?retryWrites=true&w=majority/"

mongoose.connect(URL, {
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log(err)
})

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  balans: {
    type: Number,
    default: 0,
    required: false,
  },
  win: {
    type: Number,
    default: 0,
    required: false,
  },
  games: {
    type: Number,
    default: 0,
    required: false,
  },
  spent: {
    type: Number,
    default: 0,
    required: false,
  },
  raiting: {
    type: Number,
    default: 0,
    required: false,
  },
  img:{
    type: String,
    default: "",
    require: false
  }

})

const Profile = mongoose.model('profile', dataSchema)

app.get("/profile", async (req, res) => {
  const profile = await Profile.find()
  res.json(profile)
})

app.listen(3004, () => {
  console.log('Server started on port 3004')
});