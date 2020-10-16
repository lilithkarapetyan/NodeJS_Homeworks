const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan')
const express = require('express')
const routes = require('./routers');

const DB = require('./DB');
DB.connect();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);
app.use((err, req, res, next) => {
    if(err.isCustom){
        return res.status(err.status).json({
            message: err.message,
        });
    }

    console.log(err);

    return res.status(500).json({
        message: 'Internal server error',
    });
});

const PORT = 3000;

app.listen(process.env.port || PORT, () => {
  console.log(`App listening at http://localhost:${port}`)
});