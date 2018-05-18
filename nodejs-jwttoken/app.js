const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err)
      res.json({
        message: 'error occur'
      });
    else 
      res.json({
        message: 'Post created',
        authData: authData
      });
  });
  
});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'tao',
    email: 'tao@gmail.com'
  }

  jwt.sign({user: user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token: token
    });
  });
});

// VERIFY TOKEN
function verifyToken(req, res, next) {
  // GET AUTH HEADER VALUE
  const bearerHeader = req.headers['authorization'];

  // CHECK IF UNDEFINED
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}





app.listen(5000, ()=> console.log('Server start port:5000'));