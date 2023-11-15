var express = require('express');
var cors = require('cors')
var bodyparser = require('body-parser')
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var mysql = require('mysql2');
// var pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "123456789",
//   database: "mschool",
//   connectionLimit: 20, 
//   waitForConnections: true,
//   queueLimit: 0
// });

// var pool = mysql.createPool({
//   host: "sql6.freesqldatabase.com",
//   user: "sql6632198",
//   password: "avnJGNtqjA",
//   database: "sql6632198",
//   port: 3306,
//   connectionLimit: 20,
//   waitForConnections: true,
//   queueLimit: 0
// });

// var pool = mysql.createPool({
//   host: "bs2yku6jwgpoppvqen9o-mysql.services.clever-cloud.com",
//   user: "uo48jts4vghyypfz",
//   password: "kFdkE08AHZjeDAewwgF6",
//   database: "bs2yku6jwgpoppvqen9o",
//   port: 3306,
//   connectionLimit: 20,
//   waitForConnections: true,
//   queueLimit: 0
// });

var pool = mysql.createPool({
  host: "202.92.4.11",
  user: "xwtvuluchosting_qld",
  password: "Dat@123!DT",
  database: "xwtvuluchosting_qld",
  port: 3306,
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0
});

app.listen(3000, () => console.log('Node server running @ http://localhost:3000'));

app.get('/', (req, res) => {
  res.send('Hello World')
})

// route User 
//get all
app.get('/userall', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query('select * from User', (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//get execpt admin
app.get('/user', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query("select * from User where user_id != 'ur-adm'", (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//get one
app.get('/user/:user_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('SELECT * from User where user_id = ?', [req.params.user_id], (err, result) => {

      if (!err) {
        res.send(result)
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

//delete one
app.delete('/user/:user_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from User where user_id = ?', [req.params.user_id], (err, result) => {

      if (!err) {
        res.send("Deleted item!")
      } else { console.log(err) }

    });
    pool.releaseConnection(conn)
  })
});

//delete all
app.delete('/userall', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query("DELETE from User where user_role != 'admin'", (err, result) => {

      if (!err) {
        res.send("Deleted all item!")
      } else { console.log(err) }

    });
    pool.releaseConnection(conn)
  })
});

//post one
app.post('/user', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO User SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one
app.put('/user', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { user_id, password, user_role } = req.body;

    //update name column
    conn.query('UPDATE User SET user_role = ?, password = ? WHERE user_id = ?', [user_role, password, user_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

// Route Class
// Create new class table
app.post('/newclass', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { newClass } = req.body;

    conn.query('CREATE TABLE IF NOT EXISTS ? (`hs_id` varchar(6) Primary key,`hs_name` varchar(100),`hs_vpm` varchar(1000))', [newClass], (err, result) => {

      if (!err) {
        res.send("Created new class!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//get all
app.get('/class', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query('select * from Class', (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//get one
app.get('/class/:class_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('SELECT * from Class where class_id = ?', [req.params.class_id], (err, result) => {

      if (!err) {
        res.send(result)
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

//delete one
app.delete('/class/:class_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Class where class_id = ?', [req.params.class_id], (err, result) => {

      if (!err) {
        res.send("Deleted item!")
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

//delete all
app.delete('/classall', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Class', (err, result) => {

      if (!err) {
        res.send("Deleted item!")
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

//post one
app.post('/class', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Class SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one
app.put('/class', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { class_id, class_name, gvcn_id } = req.body;

    //update name column
    conn.query('UPDATE Class SET class_name = ?, gvcn_id = ? WHERE class_id = ?', [class_name, class_id, gvcn_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

// Route Rules
//get all
app.get('/rules', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query('select * from Rules', (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//get one
app.get('/rules/:name_vp_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('SELECT * from Rules where name_vp_id = ?', [req.params.name_vp_id], (err, result) => {

      if (!err) {
        res.send(result)
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

//delete one
app.delete('/rules/:name_vp_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Rules where name_vp_id = ?', [req.params.name_vp_id], (err, result) => {

      if (!err) {
        res.send("Deleted item!")
      } else {
        console.log(err)
      }
    });

    pool.releaseConnection(conn)
  })

});

//post one
app.post('/rules', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Rules SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one
app.put('/rules', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { name_vp_id, name_vp, minus_pnt } = req.body;

    //update name column
    conn.query('UPDATE Rules SET name_vp = ?, minus_pnt = ? WHERE name_vp_id = ?', [name_vp, minus_pnt, name_vp_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

// Route Score
//get all
app.get('/score/:week_id', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query('select * from Score where week_id = ?', [req.params.week_id], (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//delete one accord class_id
app.delete('/score/:class_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Score where class_id = ?', [req.params.class_id], (err, result) => {

      if (!err) {
        res.send("Deleted item!")
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

//delete all
app.delete('/scoreall', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Score', (err, result) => {

      if (!err) {
        res.send("Deleted all item!")
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

//post one
app.post('/score', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Score SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one
app.put('/score', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { score, week_id, class_id } = req.body;

    //update name column
    conn.query('UPDATE Score SET score = ? WHERE week_id = ? and class_id = ?', [score, week_id, class_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one default
app.put('/scoredef', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { deft, week_id, class_id } = req.body;

    //update name column
    conn.query('UPDATE Score SET deft = ? WHERE week_id = ? and class_id = ?', [deft, week_id, class_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

// Route Week
//get all
app.get('/week', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query('select * from Week', (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//update one
app.put('/week', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { week_id, start_date, end_date } = req.body;
    callWeek(new Date(end_date).getDay() + 1, Number(week_id.slice(2)) - 1)
    //update name column
    conn.query('UPDATE Week SET start_date = ?, end_date = ? WHERE week_id = ?', [start_date, end_date, week_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//Route Vipham
//get one class one week
app.get('/vipham/:class_id/:week_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('select * from Vipham where class_id = ? and week_id = ?', [req.params.class_id, req.params.week_id], (err, result) => {

      if (!err) {
        res.send(result)
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })
});

//get one week
app.get('/vipham/:week_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('select * from Vipham where week_id = ?', [req.params.week_id], (err, result) => {

      if (!err) {
        res.send(result)
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })
});

//delete one accord vpm_id
app.delete('/vipham/:vpm_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Vipham where vpm_id = ?', [req.params.vpm_id], (err, result) => {

      if (!err) {
        res.send("Deleted item!")
      } else {
        console.log(err)
      }
    });

    pool.releaseConnection(conn)
  })

});

//delete all accord class_id
app.delete('/viphamall/:class_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Vipham where class_id = ?', [req.params.class_id], (err, result) => {

      if (!err) {
        res.send("Deleted all item!")
      } else {
        console.log(err)
      }
    });

    pool.releaseConnection(conn)
  })

});
//delete all class
app.delete('/viphamallclass', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Vipham', (err, result) => {

      if (!err) {
        res.send("Deleted all item!")
      } else {
        console.log(err)
      }
    });

    pool.releaseConnection(conn)
  })

});

//post one
app.post('/vipham', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Vipham SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one
app.put('/vipham', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { vpm_id, week_id, class_id, bonus, name_vp_id, quantity, name_student, create_by } = req.body;

    //update name column
    if (bonus == null) {
      conn.query('UPDATE Vipham SET name_vp_id = ?, quantity = ?, create_by = ?, name_student = ? WHERE vpm_id = ? ', [name_vp_id, quantity, create_by, name_student, vpm_id], (err, result) => {
        if (!err) {
          res.send("Inserted item!")
        } else { console.log(err); }
      });
    } else {
      conn.query('UPDATE Vipham SET name_student = ?, quantity = ?, create_by = ? WHERE bonus = ? and week_id = ? and class_id = ? ', [name_student, quantity, create_by, bonus, week_id, class_id], (err, result) => {
        if (!err) {
          res.send("Inserted item!")
        } else { console.log(err); }
      });
    }


    pool.releaseConnection(conn)
  })

});

// Route Lichtruc
//get one week
app.get('/lichtruc/:week_id', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query('select * from Lichtruc where week_id = ?', [req.params.week_id], (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//post one
app.post('/lichtruc', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Lichtruc SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })
});

//update one
app.put('/lichtruc', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { week_id, class_active, class_passive } = req.body;

    //update name column
    conn.query("UPDATE Lichtruc SET class_passive = ? WHERE week_id = ? and class_active = ? ", [class_passive, week_id, class_active], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//delete all
app.delete('/lichtrucall', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Lichtruc', (err, result) => {

      if (!err) {
        res.send("Deleted all item!")
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

// delete one
app.delete('/lichtruc/:class_active', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('DELETE from Lichtruc where class_active = ?', [req.params.class_active], (err, result) => {

      if (!err) {
        res.send("Deleted item!")
      } else { console.log(err) }

    });

    pool.releaseConnection(conn)
  })

});

// Route Feedback
//get all
app.get('/feedback', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query('Select * from Feedback', (err, result) => {

      if (!err) {
        res.send(result)
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })
});

//post one
app.post('/feedback', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Feedback SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })
});

// calculate score sovling
const schedule = require('node-schedule');
let scoreList, ruleList, vpmList, data3;

function ConvertTime(item) {
  const currentTime = new Date(item);
  const localOffset = currentTime.getTimezoneOffset();
  const offsetGMT7 = 7 * 60;
  const timestampGMT7 = currentTime.getTime() + localOffset * 60 * 1000 + offsetGMT7 * 60 * 1000;
  const date = new Date(timestampGMT7);
  return date;
}

async function fetchWeek(connection) {
  try {
    const date = ConvertTime(new Date())
    const [rowsWeek] = await connection.query('SELECT * FROM Week');
    const temp = await rowsWeek.find(obj => new Date(obj.start_date) <= date && date <= new Date(obj.end_date))
    return temp.week_id
  } catch (err) {
    console.error('Error executing query: ', err);
  }
}

async function fetchDataFromDatabase(connection) {
  try {
    const week = await fetchWeek(connection);
    const [rowsScore] = await connection.query('SELECT * FROM Score where week_id = ?', [week]);
    const [rowsRules] = await connection.query('SELECT * FROM Rules');
    const [rowsVpm] = await connection.query('SELECT * FROM Vipham where week_id = ?', [week]);

    scoreList = rowsScore;
    ruleList = rowsRules;
    vpmList = rowsVpm;
  } catch (err) {
    console.error('Error executing query: ', err);
  }
}

async function main(connection) {
  console.log('main start')
  await fetchDataFromDatabase(connection);

  if (vpmList != null && ruleList != null) {
    let dataTemp3 = JSON.parse(JSON.stringify(vpmList));

    dataTemp3.map((item) => {
      let vpmRule = ruleList.find((item2) => item2.name_vp_id == item.name_vp_id)
      item.name_vp_id = vpmRule
    })
    data3 = dataTemp3
  }

  await TinhDiem2(data3, connection)
  console.log('main completed')
}

async function SendScore(connection, param) {
  try {
    const { score, week_id, class_id } = param;
    await connection.execute('UPDATE Score SET score = ? WHERE week_id = ? and class_id = ?', [score, week_id, class_id]);
  } catch (error) {
    console.error('Error in SendScore:', error);
  }
}

async function TinhDiem2(data, connection) {
  if (scoreList != null && data != null) {
    try {
      for (const objScore of scoreList) {
        let iniMinus = 0, cnt = 0, result = 0;

        for (const obj of data) {
          if (obj.class_id == objScore.class_id) {
            if (obj.bonus == null) {
              iniMinus = iniMinus + obj.name_vp_id.minus_pnt * obj.quantity;
            } else {
              if (obj.bonus == 'Điểm sổ đầu bài') {
                result = obj.name_student.reduce((sum, object) => {
                  if (object.Tiet1 != '0') { cnt += 1 }
                  if (object.Tiet2 != '0') { cnt += 1 }
                  if (object.Tiet3 != '0') { cnt += 1 }
                  if (object.Tiet4 != '0') { cnt += 1 }
                  if (object.Tiet5 != '0') { cnt += 1 }
                  return sum + Number(object.Tiet1) + Number(object.Tiet2) + Number(object.Tiet3) + Number(object.Tiet4) + Number(object.Tiet5)
                }, 0);

                iniMinus = iniMinus + result / cnt
              } else {
                iniMinus = iniMinus + obj.quantity;
              }
            }
          }
        }

        await SendScore(connection, { week_id: objScore.week_id, class_id: objScore.class_id, score: objScore.deft + iniMinus });
      }
    } catch (error) {
      console.error('Error in TinhDiem:', error);
    }
  }
}

async function firstCall() {
  const pool2 = mysql.createPool({
    host: "bs2yku6jwgpoppvqen9o-mysql.services.clever-cloud.com",
    user: "uo48jts4vghyypfz",
    password: "kFdkE08AHZjeDAewwgF6",
    database: "bs2yku6jwgpoppvqen9o",
    port: 3306,
    connectionLimit: 20,
    waitForConnections: true,
    queueLimit: 0
  });
  const connection = pool2.promise();

  try {
    await main(connection);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection after all operations are done
    await connection.end();
    console.log('Connection closed');
  }
}

var resultDate = Array(100)
let index = 0
function callWeek(item, idx) {
  console.log('Hello, I.m callweek')
  resultDate[idx] = item
  console.log(resultDate)
}

console.log(new Date("2023-07-30T00:00:00Z"))
const job = schedule.scheduleJob({ hour: 0, minute: 0, second: 0, dayOfWeek: (resultDate[index] ? resultDate[index] : 0) }, function() {
  console.log('Time for tea!');
  firstCall()
  index += 1
});
