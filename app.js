const express = require('express')
const {engine} = require('express-handlebars');
const usersDB = require('./database/users');
const carsDB = require('./database/cars');

const app = express();

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

app.get('/', (req, res) => {
    res.json('Hello Valera')
})



app.get('/users', (req, res) => {
    res
        .json(usersDB)
})

app.get('/users/:userIndex', (req, res) => {
    console.log(req.params);
    
    const {userIndex} = req.params;
    res.json(usersDB[userIndex])
})



app.get('/cars', (req, res) => {
    res.json(carsDB)
})

app.get('/cars/:carsIndex', (req, res) => {
    console.log(req.params);

    const {carsIndex} = req.params;
    res.json(carsDB[carsIndex])
})

app.get('/page', (req, res) => {
    res.render('Welcome')
})

app.listen(5000, () => {
    console.log('Hellow World!')
});