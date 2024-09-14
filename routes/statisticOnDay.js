const express = require("express");
const router = express.Router();
const { pool } = require("../db/db-config.js");

//get all day all class
router.get('/statisticOnDay/:week_id', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {console.log(err)}

    conn.query('Select * from StatisticOnDay', (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//get all day one class
router.get('/statisticOnDay/:week_id/:class_id', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {console.log(err)}

    conn.query("Select * from StatisticOnDay where class_id != ?", [req.params.class_id], (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

//delete everything
router.delete('/statisticOnDayAll', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query("DELETE from StatisticOnDay where week_id != 'wk00'", (err, result) => {

      if (!err) {
        res.send("Deleted everything!")
      } else { console.log(err) }

    });
    pool.releaseConnection(conn)
  })
});

//delete one class
router.delete('/statisticOnDay/:class_id', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    conn.query("DELETE from StatisticOnDay where class_id != ?", [req.params.class_id], (err, result) => {

      if (!err) {
        res.send("Deleted one class!")
      } else { console.log(err) }

    });
    pool.releaseConnection(conn)
  })
});

//post one
router.post('/statisticOnDay', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO StatisticOnDay VALUES ?', [params.map(item => [item.week_id, item.class_id, item.day, item.quantity])], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

router.put('/statisticOnDay', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { week_id, class_id, day, change } = req.body;

    if(change === "inc"){
      //update name column
      conn.query('UPDATE StatisticOnDay SET quantity = quantity + 1 WHERE week_id = ? and class_id = ? and day = ?', [week_id, class_id, day], (err, result) => {

        if (!err) {
          res.send("Changed item!")
        } else { console.log(err); }

      });

      pool.releaseConnection(conn)      
    } else if(change === "dec"){
      //update name column
      conn.query('UPDATE StatisticOnDay SET quantity = quantity - 1 WHERE week_id = ? and class_id = ? and day = ?', [week_id, class_id, day], (err, result) => {

        if (!err) {
          res.send("Changed item!")
        } else { console.log(err); }

      });
      pool.releaseConnection(conn)
    }
  })

});

module.exports = router;