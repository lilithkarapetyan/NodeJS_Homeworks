const dotenv = require('dotenv');
dotenv.config();

const Koa = require('koa');
const CORS = require('@koa/cors');
const mount = require('koa-mount');
const koaJSON = require('koa-json');
const bodyParser = require('koa-bodyparser');

const DB = require('./DB');
const router = require('./routers');

DB.connect();
const app = new Koa();

app.use(CORS());
app.use(koaJSON());
app.use(bodyParser());

app.use(mount('/api', router()));

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
    console.log('Running ...');
});