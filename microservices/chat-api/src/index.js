const dotenv = require('dotenv');
dotenv.config();

const Koa = require('koa');
const morgan = require('morgan');
const koaJSON = require('koa-json');
const bodyParser = require('koa-bodyparser')
const mount = require('koa-mount');
const DB = require('./DB');
const router = require('./routers');

DB.connect();
const app = new Koa();

app.use(koaJSON());
// app.use(morgan('dev'));
app.use(bodyParser());

app.use(mount('/api', router()));

const PORT = 3001;

app.listen(process.env.port || PORT, () => {
    console.log('Running ...');
});