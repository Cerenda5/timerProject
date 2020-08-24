const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const Project = require('../models/project');

router.get('/', checkAuth, (req, res, next) => {
   Project.find()
   .select('name')
   .exec()
   .then(docs => {
       const response = {
           count: docs.length,
           projects: docs.map(doc => {
               return {
                   _id: doc._id,
                   name: doc.name,
                   url: {
                        type: 'GET',
                        url: 'http://localhost:3000/projects/' + doc._id //nom du domaine
                   }
               }
           })
       }
       res.status(200).json(response)
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       })
   });
});

router.post('/' ,  checkAuth , (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    project 
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Project CREATED successfully !',
            createdProject: {
                _id: result._id,
                name: result.name,
                request: {
                    type: 'GET',
                    description: 'CREATE_PROJECT',
                    url: 'http://localhost:3000/projects/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:projectId', checkAuth, (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id)
    .select('name')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if (doc) {
            res.status(200).json({
                project: doc,
                request: {
                    type: 'GET',
                    description: 'GET_PROJECT_BY_ID',
                    url: 'http://localhost:3000/projects/' + doc._id 

                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.put('/:projectId', checkAuth, (req, res, next) => {
    const id = req.params.projectId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Project.update({ _id: id }, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Project UPDATED successfully !',
            request: {
                type: 'GET',
                description: 'GET_PROJECT_BY_ID',
                url: 'http://localhost:3000/projects/' + id 
            },
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


router.delete('/:projectId', checkAuth, (req, res, next) => {
    const id = req.params.projectId;
    Project.remove({ _id: id })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Project DELETED successfully !',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/projects/',
                description: 'You can create a new project with this body :',
                body: {name: 'String'}
            },
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;