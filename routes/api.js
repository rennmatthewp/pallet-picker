const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/projects', (request, response) => {
  database
    .select()
    .table('projects')
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/projects', (request, response) => {
  database('projects')
    .insert(request.body , 'id')
    .then(project => {
      response.status(201).json({ id: project[0] });
    })
    .catch(err => {
      console.log('error', err);
      response.status(500).json(err);
    });
});

module.exports = router;
