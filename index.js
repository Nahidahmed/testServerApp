var express = require('express');
var app = express();

app.set('view engine','ejs');

var FamilyDetails = require('./familyDetails.js');

var logger = (req,res,next) =>{
    var url = req.url;
    var time = new Date();
    console.log(`Received request for, ${url} at ${time}`);
    next();
};

//if you want to call logger for each route
//app.use(logger);


//if you want to call logger(), include logger() as param and observer the logs on the Terminal from where
// the js app was launched
app.use('/public',express.static('files'));
app.use('/addfamily',(req,res) =>{
    res.redirect('/public/familydetails.html');
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/handleForm',(req,res) =>{
    var name = req.body.username;
    var hobbies = [].concat(req.body.hobby);
    res.render('showHobbies',{
        name: name,
        hobbies: hobbies
    });
});

app.use(
    '/index',(req,res) => {

        var name = req.query.name;

        res.status(200).type('html');

        if(name){
            res.write(`Hello, ${name}<p>Nice to meet you!!`)
        }else{
            res.write('Hello World!');
        }

        res.end();
    }
);

app.use('/create',(req,res) => {
    var newPerson = FamilyDetails ({
        father: req.body.father,
        child: req.body.child
    });

    newPerson.save( (err) => {
        if(err){
            res.type('html').status(500);
            res.send(`Error: ${err}`);
            console.log(`Error: ${err}`);
        }else{
            res.render('created',{person:newPerson});
        }
    });
});

app.get('/about',function(res,res){
        console.log('about routed')
        res.send('I am Nahid Ahmed Mansuri. I am a project manager.');
    }
);

app.use('/all',(req,res) => {
    FamilyDetails.find( (err,allPeople) => {
        if(err){
            res.type('html').status(500);
            res.send(`Error: ${err}`);
        }else if(allPeople.length == 0){
            res.type('html').status(200);
            res.send(`There are no people.`);
        }else{
            res.render('showAll',{people:allPeople});
        }
    });
});

app.use('/person', (req,res) => {
    var searchName = req.query.father;

    FamilyDetails.findOne( {father:searchName},(err,person) => {
        if(err){
            res.type('html').status(500);
            res.send(`Error: ${err}`);
        }else if(!person){
            res.type('html').status(200);
            res.send(`No records found.`);
        }else{
            res.render('personInfo',{person:person});
        }
    });
});

app.use('/update', (req,res) => {
    var updateName = req.body.father;

    FamilyDetails.findOne( {father:updateName},(err,person) => {
        if(err){
            res.type('html').status(500);
            res.send(`Error: ${err}`);
        }else if(!person){
            res.type('html').status(200);
            res.send(`No records found.`);
        }else{
            person.child = req.body.child;
            person.save( (err) => {
                if(err){
                    res.type('html').status(500);
                    res.send(`Error: ${err}`);
                }else{
                    res.render('updated',{person:person});
                }                
            });
        }
    });

});
app.listen(
    3000, () =>{
        console.log('listening on port 3000');
    }
);
