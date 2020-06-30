var express = require("express");
const bodyParser = require("body-parser");
const app = express();
var dbConn = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('home', { posts: '' })
})

app.get("/solicitud-producto",
    (req, res) => {
        dbConn.query('SELECT * FROM producto_mas_vendido_view', function(err, rows) {
            if (err) {
                res.render('vista1tablas.ejs', { data: '' });
            } else {
                res.render('vistatablas.ejs', { data: rows });
            }
        })
    });

app.set('view engine', 'ejs')
app.get('/solicitud-fecha', (req, res) => {
    // render `cliente.ejs` with the list of posts
    res.render('cliente', { posts: '' })
})

app.post('/cliente', (req, res) => {
    var fecha1 = req.body.fecha1;
    var fecha2 = req.body.fecha2;
    if (fecha1 !== undefined && fecha2 !== undefined) {
        dbConn.query(`call cliente_mayor_cantidad_compras('${fecha1}','${fecha2}')`, function(err, rows) {
            if (err) {
                console.log(err);
                res.render('vista2tablas.ejs', { data: '' });
            } else {
                res.render('vista2tablas.ejs', { data: rows[0] });
            }
        })
    } else {}
});

app.set('view engine', 'ejs')
app.get('/solicitud-formulario', (req, res) => {
    res.render('formulario')
})

app.post('/formulario', (req, res) => {
    // Order
    var new_orderNumber = req.body.new_orderNumber;
    var new_orderDate = req.body.new_orderDate;
    var new_requiredDate = req.body.new_requiredDate;
    var new_shippedDate = req.body.new_shippedDate; // opcional
    var new_status = req.body.new_status;
    var new_comments = req.body.new_comments; // opcional
    //var a7=req.body.new_customerNumber;
    var new_customerNumber = 114;
    // Order details
    //var a8=req.body.new_productCode;
    var new_productCode = 'S18_1749';
    var new_quantityOrdered = req.body.new_quantityOrdered;
    var new_priceEach = req.body.new_priceEach;
    var new_orderLineNumber = req.body.new_orderLineNumber;
    if (new_orderNumber !== undefined &&
        new_orderDate !== undefined &&
        new_requiredDate !== undefined &&
        new_status !== undefined &&
        new_customerNumber !== undefined &&
        new_productCode !== undefined &&
        new_quantityOrdered !== undefined &&
        new_priceEach !== undefined &&
        new_orderLineNumber !== undefined
    ) {
        dbConn.query(`call PedirProducto('${new_orderNumber}','${new_orderDate}','${new_requiredDate}','${new_shippedDate}','${new_status}','${new_comments}','${new_customerNumber}','${new_productCode}','${new_quantityOrdered}','${new_priceEach}','${new_orderLineNumber}')`,
            function(err, rows) {
                if (err) {
                    console.log(err);
                    res.render('vista3tablas.ejs', { data: '' });
                } else {
                    res.render('vista3tablas.ejs', { data: rows[0] });
                }
            })
    } else {}
});
app.use((req, res) => {
    res.status(404).send({
        success: false,
        data: {
            message: "Estás intentando hacer algo que no deberías"
        },
    })
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose...");
});