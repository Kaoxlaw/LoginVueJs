import express from 'express';

let router = express.Router();
let users = ['mickael', 'kao'];


router.post('/signup', (req, res) => {
  res.status(200).send(users);
});

router.post('/login', (req, res) => {
  // var user_id = req.body.id;
  // var token = req.body.token;
  // var geo = req.body.geo;

  //   res.send(user_id + ' ' + token + ' ' + geo);
});

export default router;
