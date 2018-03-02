import express from 'express';
import router from './router.js';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen('1407', () => {
  console.log('App listen on port 1407');
});