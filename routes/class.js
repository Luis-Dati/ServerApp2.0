const express = require("express");
const router = express.Router();
const { pool } = require("../db/db-config.js");

// Create new class table
router.post('/newclass', (req, res) => {
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
router.get('/class', (req, res) => {
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
router.get('/class/:class_id', (req, res) => {
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
router.delete('/class/:class_id', (req, res) => {
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
router.delete('/classall', (req, res) => {
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
router.post('/class', (req, res) => {
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
router.put('/class', (req, res) => {
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

module.exports = router;