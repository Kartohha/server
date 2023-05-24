const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const path = require('path')
const cors = require('cors')



require('dotenv').config()
const app = express();

app.use(cors({credentials: true, origin: "http://localhost:3000"}) )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin: http://localhost:3000");  
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    // "Access-Control-Allow-Origin: http://localhost:3000"
  );
  next();
});
// app.use(express.static(path.join(__dirname, '../public'), {
//   extensions: ['html', 'css', 'js']
// }))

const DB_URL= "mongodb+srv://Userrrrr:N4cb7lC9iGnyKxyK@cluster0.5q7gm0m.mongodb.net/PROFILE?retryWrites=true&w=majority"
/* mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => { console.log('connected to DB') })
  .catch(error => { console.log(error) }) */
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority'
  }
}).then(res => { console.log('connected to DB') })
.catch(error => { console.log(error) })
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  age: {
    type: Number,
    default: 0,
  },
  country: {
    type: String,
    required: true,
  },
  balans: {
    type: Number,
    default: 1000,
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

const User = mongoose.model('users', userSchema)


// app.get('/', async (req, res) => {
//   res.sendFile(path.join(__dirname + '/../public', 'index.html'))
// })

// app.get('/registration', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../public', 'index.html'))
// })

app.post('/registration', async (req, res) => {
  const { username, password, age, country } = req.body

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = new User({
    username,
    password: hash,
    age,
    country,
    salt
  });

  try {
    await user.save();
    res.send('Registration successful!')
  } catch (err) {
    console.error(err)
    res.status(500).send('Error registering user')
  }
});

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../public', 'index.html'))
// });

app.post('/login', async (req, res) => {
  const { username, password } = req.body


  const user = await User.findOne({ username })
  if (!user) return res.status(400).send('Invalid username')

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password')
  // res.header("Access-Control-Allow-Origin: http://localhost:3000")
  res.send('Login successful!')
})


app.listen(3005, () => {
  console.log('Server started on port 3003')
});