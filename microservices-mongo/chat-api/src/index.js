const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routers');
const { PORT } = require('./config/constants');
const { errorHandlerMiddleware } = require('./middlewares');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const setup = [];
setup.push(mongoose.connect(process.env.DBURL));

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);
app.use(errorHandlerMiddleware);


Promise.all(setup).then(() => {
    app.listen(process.env.port || PORT, () => {
        console.log('Running ...');
    });
}).catch(console.log);


process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    app.close(() => {
        mongoose.connection.close(false, () => {
            process.exit(0);
        });
    });
});
