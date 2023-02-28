require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./midllewares/limiter');
const { requestLogger, errorLogger } = require('./midllewares/logger');
const routes = require('./routes');
const errorHandler = require('./midllewares/errorHandler');
const cors = require('./midllewares/cors');

const { NODE_ENV } = process.env;
const { SERVER_PORT, DB } = NODE_ENV === 'production' ? process.env : require('./utils/config');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors);
app.use(helmet());

app.use(requestLogger);
app.use(limiter);

app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

async function connect() {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    console.log(`App connected ${DB}`);
    await app.listen(SERVER_PORT);
    console.log(`App listening on port ${SERVER_PORT}`);
  } catch (err) {
    console.log(err);
  }
}

connect();
