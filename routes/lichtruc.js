const express = require("express");
const router = express.Router();
const { pool } = require("../db/db-config.js");

//get one week
router.get('/lichtruc/:week_id', (req, res) => {
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
router.post('/lichtruc', (req, res) => {
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
router.put('/lichtruc', (req, res) => {
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
router.delete('/lichtrucall', (req, res) => {
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
router.delete('/lichtruc/:class_active', (req, res) => {
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

module.exports = router;