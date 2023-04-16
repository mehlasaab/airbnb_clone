//EXPRESS APP

const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'thisIsOneSecretkey';

app.use(express.json());
app.use(cookieParser());
app.use(cors({      //connecting the two api
    credentials: true,
    origin: 'http://localhost:5173',
}));

// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL); //connecting with the database

app.get('/test', (req,res)=>{
    res.json('test ok')
});


//register api endpoint
app.post('/register', async (req,res)=>{  
    const {name,email,password} = req.body;
    
    try {
        const user = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
        
    } catch (e) {
        res.status(422).json(e);
    }
});

//login api endpoint
// app.post('/login', async (req,res)=>{
//   mongoose.connect(process.env.MONGO_URL);
//     const {email,password} = req.body;
//     const user1 = await User.findOne({email});

//     if(user1){
//         //res.json('user found');
//         const passOk = bcrypt.compareSync(password,user1.password);
//         if (passOk) {
//             jwt.sign({
//               email:user1.email,
//               id:user1._id
//             }, jwtSecret, {}, (err,token) => {
//               if (err) throw err;
//               res.cookie('token', token).json(userInfo);
//             });
//         } else{
//             res.json('pass not ok')
//         }

//     } else{
//         res.status(422).json('user not found');
//     }
// });

app.post('/login', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {email,password} = req.body;
  const user1 = await User.findOne({email});
  if (user1) {
    const passOk = bcrypt.compareSync(password, user1.password);
    if (passOk) {
      jwt.sign({
        email:user1.email,
        id:user1._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(user1);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

//profile api endpoit
app.get('/profile', (req,res) => {
    //mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });

//logout api endpoint
app.post('/logout', (req,res)=> {
    res.cookie('token', '').json(true);
});

app.listen(4001); //port

//bookings-pass:
//R4jtHJGykcNPaQAi