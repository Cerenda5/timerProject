const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const Project = require('../models/project');
const Group = require ('../models/group')

router.get('/', (req, res, next) => {
    Project.find()
    .select('name groupId')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            projects: docs.map(doc => {
                return {
                    _id: doc._id,
                    group: doc.group,
                    name: doc.name,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/projects/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    Group.findById(req.body.groupId)
        //Check we do have a group
        .then(group => {
            const project = new Project({
                _id: mongoose.Types.ObjectId(),
                group: req.body.groupId,
                name: req.body.name,
            });
            if (!group) {
                return res.status(404).json({
                    message: 'Group not found'
                });
            }
            return project.save();
        })
        // Execute project creation
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Project created successfully',
                createdProject: {
                    _id: result._id,
                    group: result.group,
                    name: result.name,
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/groups/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:projectsId', (req, res, next) => {
    Project.findById(req.params.projectId)
    .select('name groupId')
    .exec()
    .then(project => {
        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }
        res.status(200).json({
            project: project,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/projects/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.put('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propUser] = ops.value;
    }
    Group.update({ _id: id }, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Project UPDATED successfully !',
            request: {
                type: 'GET',
                description: 'GET_Project_BY_ID',
                url: 'http://localhost:3000/projects/' + id 
            },
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


router.delete('/:projectId', (req, res, next) => {
    Project.remove({ _id: req.params.projectId })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Project DELETED successfully !',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/projects/',
                description: 'You can create a new project with this body :',
                body: { groupId: 'ID', name: 'String'}
            },
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

module.exports = router;