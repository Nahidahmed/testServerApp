var express = require('express');
var app = express();

app.use(
    '/',(req,res) => {

        var name = req.query.name;

        res.status(200).type('html');

        if(name){
            res.write('Hello, ' + name + '<p>' +'Nice to meet you!!')
        }else{
            res.write('Hello World!');
        }

        res.end();
    }
);

app.listen(
    3000, () =>{
        console.log('listening on port 3000');
    }
);
