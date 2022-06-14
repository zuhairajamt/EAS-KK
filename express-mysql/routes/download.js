var express = require('express');
const excel = require('exceljs');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM ujian ORDER BY IDSiswa', function (err, ujian) {
		
    const jsonUjian = JSON.parse(JSON.stringify(ujian));
    
    let workbook = new excel.Workbook(); //creating workbook
    let worksheet = workbook.addWorksheet('Ujian'); //creating worksheet
  
    //  WorkSheet Header
    worksheet.columns = [
      { header: 'IDSiswa', key: 'IDSiswa', width: 10 },
      { header: 'Nama', key: 'Nama', width: 30 },
      { header: 'NRP', key: 'NRP', width: 30},
      { header: 'Mapel', key: 'Mapel', width: 30},
      { header: 'Score', key: 'Score', width: 30},
      { header: 'Kota', key: 'Kota', width: 10, outlineLevel: 1}
    ];
  
    // Add Array Rows
    worksheet.addRows(jsonUjian);
  
    // Write to File
    workbook.xlsx.writeFile('routes/ujian.xlsx')
    .then(function() {
      console.log('file saved!');
      const file = `${__dirname}/ujian.xlsx`;
      res.download(file); // Set disposition and send it.      
    });
   
    // -> Check 'ujian.csv' file in route project folder
  });
});

module.exports = router;