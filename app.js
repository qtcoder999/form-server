const express = require('express');
const fs = require('fs');
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

const port = process.env.PORT || 4500;

app.post('/submitpoint', function (req, res) {
    var previousJSON,newJSON;
    fs.readFile('demoDB.json', function (err, buf) {

        previousJSON = JSON.parse(buf.toString());

        previousJSON.users.push(req.body);

        newJSON = previousJSON;

        fs.writeFile('demoDB.json', JSON.stringify(newJSON), function (err, data) {
            if (err) console.log(err);
           
        });

        
        if (err) console.log(err);
    });

    res.send('ok');
})

app.post('/contactpoint', function (req, res) {
    console.log(req.body);

    fs.readFile('demoDB.json', function (err, buf) {

        var n1 = JSON.parse(buf.toString());

        var lastElement = n1.users[n1.users.length-1];

        console.log("lastElement",lastElement );

        res.send(JSON.stringify(lastElement));

        console.log("Successfully read into node.");
        if (err) console.log(err);
    });

})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});