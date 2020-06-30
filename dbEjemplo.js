var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',

});

connection.connect(function(error) {
    if (!error) {
        console.log(error);
    } else {
        console.log('Conectado con exito');
    }
})