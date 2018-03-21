const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/projects', (req, res) => {
  database
    .select()
    .table('projects')
    .then(projects => {
      res.status(200).json(projects);
    });
});

router.post('/projects', (req, res) => {
  database('projects')
    .insert({ name: req.body.name }, 'id')
    .then(project => {
      res.status(201).json({ id: project[0] });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).json(err);
    });
});

module.exports = router;
