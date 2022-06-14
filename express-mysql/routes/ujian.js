var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM ujian ORDER BY IDSiswa', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('ujian', {
                data: ''
            });
        } else {
            //render ke view posts index
            res.render('ujian/index', {
                data: rows // <-- data posts
            });
        }
    });
});

module.exports = router;