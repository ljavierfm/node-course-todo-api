const express=require('express');
const bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo.js');
var { User } = require('./models/user.js');

var app=express();

app.listen(3000,()=>{
    console.log('Started on port 3000');
});