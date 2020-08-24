const mongoose = require('mongoose');
const Group = require('../models/group');

exports.groups_get_all = (req, res, next) => {
    Group.find()
    .select('name user')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            groups: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    user: doc.user,
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

exports.groups_create_group = (req, res, next) => {
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user: req.body.user
    });
    group
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Group CREATED successfully !',
            createdGroup: {
                _id: result._id,
                name: result.name,
                user: result.user,

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
        res.status(500).json({error: err});
    });
};

exports.groups_get_group =  (req, res, next) => {
    const id = req.params.groupId;
    Group.findById(id)
    .select('name user')

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