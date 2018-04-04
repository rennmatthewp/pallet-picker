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
    .catch(error => {
      response.status(500).json({ error });
    });
});

router.post('/projects', (request, response) => {
  const project = request.body;
  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <String> }. Missing "${requiredParameter}" property.`
      });
    }
  }

  database('projects')
    .insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

router.get('/palettes', (request, response) => {
  database
    .select()
    .table('palettes')
    .then(palettes => {
      response.status(200).json(palettes);
    })
    .catch(error => response.status(500).json({ error }));
});

router.get('/palettes/:id', (request, response) => {
  database('palettes')
    .where('id', request.params.id)
    .select()
    .then(palette => {
      if (palette) {
        response.status(200).json(palette);
      } else {
        response.status(404).json({
          error: `Could not find palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

router.post('/palettes', (request, response) => {
  const palette = request.body;
  for (let requiredParameter of ['name', 'palette', 'project_id']) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <String>, palette: <String>, project_id: <Integer> }. Missing "${requiredParameter}" property.`
      });
    }
  }

  database('palettes')
    .insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] });
    })
    .catch(error => response.status(500).json({ error }));
});

module.exports = router;
