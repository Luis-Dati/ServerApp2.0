const express = require("express");
const router = express.Router();
const { pool } = require("../db/db-config.js");

//get all
router.get('/week', (req, res) => {
  pool.getConnection(function(err, conn) {
    if (err) {
      console.log(err)
    }

    conn.query('Select * From Week', (err, result) => {
      if (err) {
        console.log(err)
        return
      };
      res.send(result)
    });

    pool.releaseConnection(conn);
  })
});

router.post('/week', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Week SET ?', params, (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one
router.put('/week', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { week_id, start_date, end_date } = req.body;
    //update name column
    conn.query('UPDATE Week SET start_date = ?, end_date = ? WHERE week_id = ?', [start_date, end_date, week_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

module.exports = router;