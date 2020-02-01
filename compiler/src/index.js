const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const CP = require('./codeParser.js');
const MP = require('./gotoProcessing.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000);

var compiled = [];
var joined = [];

app.post('/submit', ((req, res) =>
		     {var src = req.body.sources;
		      var prepared = MP.replaceNames(src.split(';'), MP.findMarks(src.split(';')));
		      console.log(prepared);
		      compiled = CP(prepared).filter(e => e !== undefined);
		      console.log(compiled);
		      res.send('submitted '+src);
		      res.end('terminted');}));
app.get('/compiled', ((req, res) => {
    var joined = [];
    compiled.map(e => e.map(e1 => joined.push(e1)));
    res.send(joined);
}));
