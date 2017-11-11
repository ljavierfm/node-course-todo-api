const express=require('express');
const bodyParser=require('body-parser');
const { ObjectID } = require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo.js');
var { User } = require('./models/user.js');

var app=express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo=new Todo({
        text:req.body.text
    });
    
    todo.save().then((document)=>{
        res.send(document);
    },(err)=>{
        res.status(400).send(err);
    });

});

app.get('/todos',(req,resp)=>{
    Todo.find().then((todos)=>{
        resp.send({todos})
    },(err)=>{
        res.status(400).send(err);
    });
});

//GET /todos/12345
app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    } else {
        User.findById(id).then((user) => {
            if (!user) {
                res.status(404).send({result:'User not found'});
            }
            res.status(200).send(JSON.stringify(user,undefined,2));
        }).catch((err)=>{
            res.status(400).send();
        })
    }
})

app.listen(3000,()=>{
    console.log('Started on port 3000');
});


module.exports={app};