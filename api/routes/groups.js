const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Group = require('../models/group');
const Project = require('../models/project');
const project = require('../models/project');

router.get('/', (req, res, next) => {
    Group.find()
    .select('name projectId user')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            groups: docs.map(doc => {
                return {
                    _id: doc._id,
                    project: doc.project,
                    name: doc.name,
                    user: doc.user,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/groups/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {
    Project.findById(req.body.projectId)
        //Check we do have a project
        .then(project => {
            const group = new Group({
                _id: mongoose.Types.ObjectId(),
                project: req.body.projectId,
                name: req.body.name,
                user: req.body.user
            });
            if (!project) {
                return res.status(404).json({
                    message: 'Project not found'
                });
            }
       
            return group.save();
        })
        // Execute group creation
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Group created successfully',
                createdGroup: {
                    _id: result._id,
                    project: result.project,
                    name: result.name,
                    user: result.user
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

router.get('/:groupId', (req, res, next) => {
    Group.findById(req.params.groupId)
    .select('name projectId user')
    .exec()
    .then(group => {
        if (!group) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }
        res.status(200).json({
            group: group,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/groups/'
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

router.put('/:groupId', (req, res, next) => {
    const id = req.params.groupId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propUser] = ops.value;
    }
    Group.update({ _id: id }, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Group UPDATED successfully !',
            request: {
                type: 'GET',
                description: 'GET_GROUP_BY_ID',
                url: 'http://localhost:3000/groups/' + id 
            },
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete('/:groupId', (req, res, next) => {
   Group.remove({ _id: req.params.groupId })
   .exec()
   .then(result => {
    console.log(result);
    res.status(200).json({
        message:'Group DELETED successfully !',
        request: {
            type: 'POST',
            url: 'http://localhost:3000/groups/',
            description: 'You can create a new group with this body :',
            body: { projectId: 'ID', name: 'String', user: 'String' }
        },
    });
})
   .catch()
});

module.exports = router;