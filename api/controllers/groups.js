const mongoose = require('mongoose');
const Group = require('../models/group');
const User = require('../models/user');
const Project = require('../models/project');

// Get all Groups
exports.groups_get_all = (req, res, next) => {
    Group.find()
    .select('name users projects')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            groups: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    users: doc.users,
                    projects: doc.projects,
                    url: {
                        type: 'GET',
                         url: 'http://localhost:3000/groups/' + doc._id //nom du domaine
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
};

// Create new Group
exports.groups_create_group = (req, res, next) => {
    User.findById(req.body.userId)
        //Check we do have users
        .then(user => {
            const group = new Group({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                users: req.body.userId,
                projects: req.body.projetId
            });
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    message: 'Users not found'
                });
            }
            return group.save();
        })
        Project.findById(req.body.projectId)
        .then(project => {
            const group = new Group({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                users: req.body.userId,
                projects: req.body.projectId
            });
            console.log(project);
  
            return group.save();
        })
        // Execute group creation
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Group CREATED successfully !',
                createdGroup: {
                    _id: result._id,
                    name: result.name,
                    users: result.users,
                    projects: result.projects,
    
                    request: {
                        type: 'GET',
                        description: 'CREATE_GROUP',
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


// Get Group by Id
exports.groups_get_group =  (req, res, next) => {
    const id = req.params.groupId;
    Group.findById(id)
    .select('name users projects')

    .exec()
    .then(doc => {
        console.log('From database', doc);
        if (doc) {
            res.status(200).json({
                group: doc,
                request: {
                    type: 'GET',
                    description: 'GET_GROUP_BY_ID',
                    url: 'http://localhost:3000/groups/' + doc._id 

                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

// Update Group by Id
exports.groups_update_group = (req, res, next) => {
    const id = req.params.groupId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
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
};

// Delete Group by Id
exports.groups_delete_group =  (req, res, next) => {
    const id = req.params.groupId;
    Group.remove({ _id: id })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Group DELETED successfully !',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/groups/',
                description: 'You can create a new group with this body :',
                body: {name: 'String', user: 'String'}
            },
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};