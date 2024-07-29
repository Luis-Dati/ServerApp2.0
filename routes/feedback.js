const express = require("express");
const router = express.Router();
const { pool } = require("../db/db-config.js");

//get all
router.get('/feedback', (req, res) => {
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
router.post('/feedback', (req, res) => {
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

module.exports = router;