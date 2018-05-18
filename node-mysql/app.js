const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: '1234',
	database	: 'nodemysql'
});

// connect
db.connect((err) => {
	if(err) throw err;
	console.log('MySql Connected...');
});

const app = express();

// create db
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE nodemysql';
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Database created...');
	});
});

// create table
app.get('/createtable', (req, res) => {
	let sql = `CREATE TABLE posts(
		id int AUTO_INCREMENT, 
		title VARCHAR(255), 
		body VARCHAR(255), 
		PRIMARY KEY(id))`;
	db.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

// insert post
app.get('/addpost', (req, res) => {
	let post = {
		title	: 'Post One',
		body	: 'dis is post one' 
	}

	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err , result) => {
		if(err) throw err;
		console.log(result);
		res.send('Posts One created...');
	});
});

app.get('/getposts', (req, res) => {
	let sql = 'SELECT * FROM posts';
	let query = db.query(sql, (err, results) => {
		if(err) throw err;
		console.log(results);
		res.send(results)
	});
});

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
	let newTitle = 'Updated Title';
	let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
		res.send('post updatedd..');
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
	let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
		res.send('post deleted..');
    });
});

app.get('', (req, res) => {
	res.send(`
		create database => /createdb <br>
		create table => /createtable <br>
		create post => /addpost <br>
		/getposts 		<br>
		/getpost/id 	<br>
		/updatepost/id 	<br>
		/deletepost/id 	<br>
	`);
});

app.listen('3000', () => {
	console.log('Server started on port 3000...');
});

