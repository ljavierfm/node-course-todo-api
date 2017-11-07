const mongoose=require('mongoose');

//usar promise
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp',{useMongoClient:true});

//creacion del modelo Todo
var Todo=mongoose.model('Todo',{
    text:{
        type:String
    },
    completed:{
        type:Boolean
    },
    completedAt:{
        type:Number
    }
});


/* //crea registro
var newTodo= new Todo({
    text:'Cook dinner'
});

//Guarda en bd
newTodo.save().then((result)=>{
    console.log('Saved todo',result);
},(err)=>{
    console.log(err);
}); */

//registro para ejercicio
var otherNewTodo=new Todo({
    text:'Comer la cena',
    completed:true,
    completedAt:new Date().getMilliseconds()
})

//Guarda en bd
otherNewTodo.save().then((result) => {
    console.log('Saved todo', result);
}, (err) => {
    console.log(err);
});
