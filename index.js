var express = require('express');
var app = express();

app.set('view engine','ejs');


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

app.get('/about',function(res,res){
        console.log('about routed')
        res.send('I am Nahid Ahmed Mansuri. I am a project manager.');
    }
);


app.listen(
    3000, () =>{
        console.log('listening on port 3000');
    }
);
