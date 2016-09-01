express = require('express')
router = express.Router()
models = require('../models')

router.get '/tasks', (req, res, next) ->
  models.Task.findAll().then (tasks) ->
    res.json tasks || []

router.get '/tasks/:id', (req, res, next) ->
  models.Task.findById(req.params.id)
  .then (task) ->
    res.json task || {}

router.post '/tasks', (req, res, next) ->
  models.Task.create(req.body)
  .then (created_obj) ->
    res.json created_obj
  .catch (err) ->
    res.status = 400
    res.json(msg: err)

router.delete '/tasks/:id', (req, res, next) ->
  models.Task.destroy(where: {id: req.params.id})
  .then (deleted_obj) ->
    res.json {id: req.params.id}

module.exports = router;
