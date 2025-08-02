var express = require('express');
var cors = require('cors')
var bodyparser = require('body-parser')
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.listen(3000, () => console.log('Node server running @ http://localhost:3000'));
app.get('/', (req, res) => {
  res.send('NO Hello World 2.5')
})

//check API
const API_KEY = 'f994a7d6-a4c5-46bd-85c4-964f11d877a5';

// Middleware kiểm tra API key
function checkApiKey(req, res, next) {
  const userApiKey = req.headers['api-key']; // Lấy API key từ phần header

  // Kiểm tra API key
  if (userApiKey && userApiKey === API_KEY) {
    next(); // Tiếp tục xử lý nếu API key đúng
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }
}
app.use(checkApiKey);

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

console.log(new Date().toString())