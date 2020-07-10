const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');


const db = require('./', (req, res) => {
    res.send("Hello! Welcome to Delsecto!")
});


app.listen(PORT, () => console.log(``));