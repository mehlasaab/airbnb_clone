//EXPRESS APP

const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
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
app.post('/login', async (req,res)=>{

    const {email,password} = req.body;
    const user1 = await User.findOne({email});

    if(user1){
        res.json('user found');
    } else{
        res.json('user not found');
    }
});


app.listen(4001); //port

//bookings-pass:
//R4jtHJGykcNPaQAi