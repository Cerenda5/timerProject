const mongoose = require('mongoose');
const Project = require('../models/project');
const Group = require ('../models/group');
const Timer = require('../models/timer');

// Get all Project
exports.projects_get_all = (req, res, next) => {
    Project.find()
    .select('name group timer')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            projects: docs.map(doc => {
                return {
                    _id: doc._id,
                    group: doc.group,
                    name: doc.name,
                    timer: doc.timer,
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
};


// Create new Project
exports.projects_create_project = (req, res, next) => {
    Group.findById(req.body.groupId)
        //Check we do have a group
        .then(group => {
            const project = new Project({
                _id: mongoose.Types.ObjectId(),
                group: req.body.groupId,
                name: req.body.name,
                timer: req.body.timerId
            });
            if (!group) {
                return res.status(404).json({
                    message: 'Group not found'
                });
            }
            return project.save();
        })
        // Execute project creation
        Group.findById(req.body.groupId)
        .exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Project created successfully',
                createdProject: {
                    _id: result._id,
                    group: result.group,
                    name: result.name,
                    timer: result.timerId,

                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/groups/' + result._id
                }
            }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// Get Project by Id
exports.projects_get_project = (req, res, next) => {
    Project.findById(req.params.projectId)
    .select('name groupId timeriD')
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
                url: 'http://localhost:3000/projects/' + project._id 

            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

// Update Project by Id
exports.projects_update_project = (req, res, next) => {
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
};

// Delete Project by Id
exports.projects_delete_project = (req, res, next) => {
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
};