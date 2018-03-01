import express from 'express';
let app = express();

app.listen('8080', ()=> {
  console.log('App listen on port 8080');
});