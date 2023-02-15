const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const register = require("./controllers/register");
const profileId = require('./controllers/profileId');
const image = require('./controllers/image');
const signin = require('./controllers/signin');
const db = knex({
  client:'pg',
  connection:{
    host:'127.0.0.1',
    user:'postgres',
    password:'134679',
    database:'smart-brain',
  }
});

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => db.select('*').from('users').then(user => res.json(user)));

app.get("/profile/:id", (req,res) => { profileId.handleProfileId(req,res,db)});

app.put("/image",(req,res) => {image.handleImage(req,res,db)});

app.post("/imageurl",(req,res) => {image.handleApiCall(req,res)});

app.post("/signin",(req,res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post("/register", (req,res) => { register.handleRegister(req,res,db,bcrypt)});

app.listen(3000);