var express = require('express');
var cors = require('cors')
var bodyparser = require('body-parser')
var app = express();
 
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// var pool = mysql.createPool({
//   host: "103.57.222.81",
//   user: "datthpt_db",
//   password: "123456@",
//   database: "datthpt_db",
//   port: 3306,
//   connectionLimit: 20,
//   waitForConnections: true,
//   queueLimit: 0
// });

app.listen(3000, () => console.log('Node server running @ http://localhost:3000'));

app.get('/', (req, res) => {
  res.send('NO Hello World')
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

// const schedule = require('node-schedule')
console.log(new Date("2023-07-30T00:00:00Z"))
// const job = schedule.scheduleJob({ hour: 0, minute: 0, second: 0, dayOfWeek: 0 }, function() {
//   console.log('Time for tea!');
// });

// async function getSth() {
//   const response = await fetch('https://eti.vn/public/dat/');
//   console.log(response)
//   const jsonData = await response.json();
//   console.log(jsonData)
// }

// getSth()