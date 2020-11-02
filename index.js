var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser  = require("body-parser");

var client = mysql.createConnection({
    host:'localhost',
    user:'jay',
    database:'jay',
    password:'password'
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.listen(8005, () => console.log("Server running on 8005"));

// client.query('SELECT COUNT(*) AS total FROM users', (error,result)=>{
//     if(error){
//         console.log("error..");
//     } else {
//         console.log(result);
//     }
// })

app.get("/",(req, res) => {
    client.query('SELECT * FROM todo', function(err, result){
        if(err) throw err;
        // var count = results[0].count;
        console.log(result);
        res.render("home", {Todo: result});
    });
});

app.post("/register", function(req, res) {
    var doit = {
        todoList: req.body.todoit
    };
    client.query('INSERT INTO todo SET ?', doit, function(err, result){
        if(err) throw err;
        console.log("successfully updated.");
        res.redirect("/")
    });
});