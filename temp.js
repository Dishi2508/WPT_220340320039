let dbParameters =
{
	host: 'localhost',
	user: 'dishi',
	password: 'welcome2508',
	database: 'WPT',
	port: 3306
};
const express = require('express');
const app = express();

const mysql = require("mysql2");
const conn = mysql.createConnection(dbParameters);

app.use(express.static('abc'));


app.get('/getAllBooks', function (req, res) {
	let input = req.query.y;
	console.log(input);
	let output =
	{
		bookStatus: false,
		bookDetails: { bookid: 101, bookname: "Harry Potter", price: 650 },
	};
	conn.query("select * from book where bookid =?", [input], (error, rows) => {
		if (rows.length > 0) {
			output.bookStatus = true;
			output.bookDetails = row[0];
		}
		res.send(output);
	}

});

app.get("/updateDetails", (req, res) => {
	let output = false;
	let input = {
		bookid: req.query.bookid,
		bookname: req.query.bookname,
		price: req.query.price,
	};

	conn.query(
		"update book set price = ? where bookid = ?",
		[input.price, input.bookid],
		(error, NotWorking) => {
			if (error) {

			}
			else if (NotWorking.affectedRows > 0) output = true;
			res.send(output);
		}
	);

});


app.listen(8081, function () {
	console.log("server listening at port 8081...");
});