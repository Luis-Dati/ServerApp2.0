const express = require("express");
const router = express.Router();
const { pool } = require("../db/db-config.js");

//get all
router.get('/score/:week_id', (req, res) => {
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
router.delete('/score/:class_id', (req, res) => {
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
router.delete('/scoreall', (req, res) => {
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
router.post('/score', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const params = req.body;

    conn.query('INSERT INTO Score VALUES ?', [params.map(item => [item.week_id, item.class_id, item.score, item.deft, item.note])], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one score
router.put('/score', (req, res) => {
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

//update one note
router.put('/scorenote', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) { console.log(err) }

    const { note, week_id, class_id } = req.body;

    //update name column
    conn.query('UPDATE Score SET note = ? WHERE week_id = ? and class_id = ?', [note, week_id, class_id], (err, result) => {

      if (!err) {
        res.send("Inserted item!")
      } else { console.log(err); }

    });
    pool.releaseConnection(conn)
  })

});

//update one default
router.put('/scoredef', (req, res) => {
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

module.exports = router