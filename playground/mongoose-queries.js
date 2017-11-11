const { ObjectID } = require('mongodb');
const { mongoose}=require('../server/db/mongoose');
const{Todo}=require('../server/models/todo');
const { User } = require('../server/models/user');

/*var id = "$5a0208b7e1a0ee25d8f9bb4f";

if (!ObjectID.isValid(id)){
    console.log('Id is not valid');
}

 Todo.find({
    _id:id
}).then((todos)=>{
    console.log('Todos: ',todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo: ', todo);
}); */

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found')
//     }
//     console.log('Todo by id: ', todo);
// }).catch((err)=>{
//     console.log(err);
// });

var id ="5a03598f6b14d525548d9b79";

if(!ObjectID.isValid(id)){
    return console.log('Id is not valid');
}else{
    User.findById(id).then((user)=>{
        if (!user){
            return console.log('Id is not found');
        }
        console.log('User by id: ',user);
    })
}


