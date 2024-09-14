var express = require('express');
var cors = require('cors')
var bodyparser = require('body-parser')
var app = express();
 
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.listen(3000, () => console.log('Node server running @ http://localhost:3000'));

app.get('/', (req, res) => {
  res.send('NO Hello World 2.2')
})

//import Route
const users = require('./routes/users.js');
const classs = require('./routes/class.js');
const rules = require('./routes/rules.js');
const week = require('./routes/week.js');
const feedback = require('./routes/feedback.js');
const lichtruc = require('./routes/lichtruc.js');
const score = require('./routes/score.js');
const vipham = require('./routes/vipham.js');
const statisticOnDay = require('./routes/statisticOnDay.js');

//use Route
app.use(users);
app.use(classs);
app.use(rules);
app.use(week);
app.use(feedback);
app.use(lichtruc);
app.use(score);
app.use(vipham);
app.use(statisticOnDay);

console.log(new Date("2023-07-30T00:00:00Z"))