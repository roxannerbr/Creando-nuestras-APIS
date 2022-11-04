const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Actors = db.Actor;


module.exports = {
    //Aqui dispongo las rutas para trabajar con el CRUD
    create: function (req,res) {
        Actors.create(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id,
            }
        )
        .then(actor=> {
            let arr=[]
            arr.push(actor)
            let response={
                meta:{
                    status:200,
                    message:'El nuevo actor fue creado con exito',
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
                    message:'Hubo un error al crear el actor',
                    url:`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data:error
            }
            res.status(500).json(response)
        })
    },
    destroy: function (req,res) {
        let actorId = req.params.id;
        let actor=Actors.findOne({
            where:{
                id:actorId
            }
        })
        let eliminar=Actors.destroy({
            where: {
                id: actorId
            }, force: true
        }) // force: true es para asegurar que se ejecute la acción
        Promise.all([actor,eliminar])
        .then(([actor,eliminar])=>{
            let arr=[]
            arr.push(actor)
            let response={
                meta:{
                    status:500,
                    message:'El actor fue eliminado con exito',
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
                    message:'Hubo un error al contratar al actor',
                    url:`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data:error
            }
            res.status(500).json(response)
        })
    }
}

