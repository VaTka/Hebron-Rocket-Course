const express = require('express')
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const {PORT, MONGO_URL} = require('./config/config');
const {userRouter, carRouter, authRouter} = require('./routes');
const e = require("express");
const ApiError = require('./error/ApiError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect(MONGO_URL).then(() => {
  console.log("Good!")
})

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/cars', carRouter)
app.use('*', _notFoundHandler);

app.use(_mainErrorHandler);

function _notFoundHandler(req, res, next){
  next(new ApiError('Not Found', 404));
}

function _mainErrorHandler(err, req, res) {
  console.log(err)
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server Error',
      status: err.status
    })
}

app.get('/', (req, res) => {
  res.json('Hello Valera');
});

app.get('/page', (req, res) => {
  res.render('Welcome');
})

app.listen(PORT, () => {
  console.log('Hellow World!')
});
