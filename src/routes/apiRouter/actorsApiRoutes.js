const express = require('express');
const router = express.Router();
const {create,destroy} = require('../../controllers/apiControllers/actorsController');


//Rutas exigidas para la creación del CRUD
router.post('/actors/create',create);
router.delete('/actors/delete/:id',destroy);

module.exports = router;