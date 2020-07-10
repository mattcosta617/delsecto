const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(``));