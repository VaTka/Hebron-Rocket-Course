const express = require('express')
const {engine} = require('express-handlebars');
const carsDB = require('./database/cars');
const userRouter  = require('./routes/user-router');
const carsRouter  = require('./routes/cars-router');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect('mongodb://localhost:27017/hebron_rocket').then(() => {
    console.log("Good!")
})

app.use('/users', userRouter)
app.use('/cars', carsRouter)

app.get('/', (req, res) => {
    res.json('Hello Valera');
});

app.get('/page', (req, res) => {
    res.render('Welcome')
})

app.listen(5000, () => {
    console.log('Hellow World!')
});