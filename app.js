var mysql      = require('mysql');
var bodyParser = require('body-parser');
var express    = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host      : 'localhost',
	user      : 'root',
	database  : 'join_us'
});


app.get('/', function(req, res) {
	var q = 'SELECT COUNT(*) AS total FROM users';

	connection.query(q, function(err, results){
		if(err) throw err;
		var count = results[0].total;
		
		res.render("home", {count: count});
	})
	
});

app.post('/register', function(req, res){
	var user = { email: req.body.email};
	var q = 'INSERT INTO users SET ?';
	
	connection.query(q, user, function(err, result){
		if(err) throw err;
		res.redirect('/')
	})
})

app.listen(3000, function(){
	console.log('SERVER RUNNING AT 3000')
})