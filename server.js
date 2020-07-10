const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

//Home
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.use('/language', authorsCtrl);

app.use('/questions', authorsCtrl);

app.use('/', authorsCtrl);

const db = require('./', (req, res) => {
    res.send("Hello! Welcome to Delsecto!")
});


app.listen(PORT, () => console.log(``));

//