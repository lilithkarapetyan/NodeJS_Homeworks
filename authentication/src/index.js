const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const apiPort = process.env.PORT || 3000;
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const {
    signUp,
    signIn,
} = require('./controllers/auth')


app.post('/signUp', signUp);
app.get('/signIn', signIn);

app.listen(apiPort);
