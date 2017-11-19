const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const { ObjectID } = require('mongodb');

let {mongoose}=require('./db/mongoose');
let {Todo}=require('./models/todo.js');
let { User } = require('./models/user.js');

let app = express();

const port=process.env.PORT ||3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    let todo = new Todo({
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
    let id = req.params.id;

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
});

app.delete('/todos/:id',(req,res)=>{
    let id=req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }else{
        Todo.findByIdAndRemove(id).then((todo) => {
            if(!todo){
                res.status(404).send();
            }else{
                res.status(200).send(JSON.stringify(todo,undefined,2));
            }
        }).catch((err)=>{
            res.status(400).send(err);
        });
    }
});

app.patch('/todos/:id',(req,res)=>{
    let id = req.params.id;
    //Creates an object composed of the picked object properties.
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    } else {
        //Checks if value is classified as a boolean primitive or object.
        if(_.isBoolean(body.completed)&& body.completed){
            body.completedAt=new Date().getTime();
        }else{
            body.completed=false;
            body.completedAt=null;
        }

        Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
            res.send({todo});
        }).catch((e)=>{
            res.status(400).send();
        })
    }

});

app.post('/users', (req, res) => {
    let body =_.pick(req.body,['email','password']);
    let user=new User(body);

    user.save().then(() => {
        //res.send(user);
        //devuelve una promise
        user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user)
    }).catch((err)=>{
        res.status(400).send(err);
    });

});


app.listen(port,()=>{
    console.log(`Started up at port ${port}`);
});


module.exports={app};