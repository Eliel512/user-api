const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const morgan = require("morgan");
const compression = require('compression');
const appRoutes = require('./routes/app.router.js');

app = express();

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(morgan("tiny"));
app.use(compression());

// app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', appRoutes);

module.exports = app;