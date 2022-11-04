const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    //Aqui dispongo las rutas para trabajar con el CRUD
    create: function (req,res) {
        Movies.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(pelicula=> {
            let arr=[]
            arr.push(pelicula)
            let response={
                meta:{
                    status:200,
                    message:'La pelicula fue creada con exito',
                    total: arr.length,
                    url:`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data:arr
            }
            return res.status(200).json(response)       
        })
        .catch(error => {
            let response={
                meta:{
                    status:500,
                    message:'Hubo un error al crear la pelicula',
                    url:`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data:error
            }
            res.status(500).json(response)
        })
    },
    destroy: function (req,res) {
        let movieId = req.params.id;
        let pelicula=Movies.findOne({
            where:{
                id:movieId
            }
        })
        let eliminar=Movies.destroy({
            where: {
                id: movieId
            }, force: true
        }) // force: true es para asegurar que se ejecute la acción
        Promise.all([pelicula,eliminar])
        .then(([pelicula,eliminar])=>{
            let arr=[]
            arr.push(pelicula)
            let response={
                meta:{
                    status:500,
                    message:'La pelicula fue eliminada con exito',
                    url:`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data:error
            }
            res.status(500).json(response)
        })
        .catch(error => {
            let response={
                meta:{
                    status:500,
                    message:'Hubo un error al crear la pelicula',
                    url:`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data:error
            }
            res.status(500).json(response)
        })
    }
}

module.exports = moviesController;