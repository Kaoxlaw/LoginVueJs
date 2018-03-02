import express from 'express';

let router = express.Router();
let users = ['jean', 'paul'];

router.get('/login', (req, res) => {
  res.status(200).send(users);
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  res.status(200).send(users[id]);
});

export default router;