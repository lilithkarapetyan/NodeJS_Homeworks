const dotenv = require('dotenv');
dotenv.config();

const Koa = require('koa');
const morgan = require('morgan');
const koaJSON = require('koa-json');
const bodyParser = require('body-parser')

const DB = require('./DB');
const routes = require('./routers');

DB.connect();
const app = new Koa();

app.use(koaJSON());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(routes.routes());

const PORT = 3001;

app.listen(process.env.port || PORT, () => {
    console.log('Running ...');
});