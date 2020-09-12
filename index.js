var express = require('express');
var app = express();

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


app.use('/public',express.static('files'));

app.listen(
    3000, () =>{
        console.log('listening on port 3000');
    }
);
