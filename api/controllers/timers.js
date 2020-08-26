const mongoose = require('mongoose');
const Timer = require('../models/timer');
const Project = require('../models/project');

exports.timers_get_all = (req, res, next) => {
    Timer.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            timer: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    project: doc.project,
                    value: doc.value,
                    request: {
                        typer: 'GET',
                        url: 'http://localhost:3000/timers/' + doc._id
                    }
                }
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.timers_create_timer = (req, res, next) => {
    Project.findById(req.body.projectId)
    //Check we do have a project
    .then(project => {
        const timer = new Timer({
            _id: mongoose.Types.ObjectId(),
            project: req.body.projectId
        })
        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }
        return timer.save();
    })
    //Execute timer creation
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Timer created succesfully',
            createdTimer: {
                _id: result.id,
                project: result.project,
                name: result.name,
                value: result.value
            },
            request: {
                type: 'GET',
                url: 'httpo://localhost:3000/timers/' + result._id
            }
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.timers_get_timer = (req, res, next) => {
    Timer.findById(req.params.timerId)
    .exec()
    .then (timer => {
        if (!timer) {
            return res.status(404).json({
                message: 'Timer not found'
            })
        }
        res.status(200).json({
            timer: timer,
            request: {
                type: 'GET',
                description: 'GET_Timer_BY_ID',
                url: 'http://localhost:3000/timers/' + timer._id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.timers_update_timer = (req, res, next) => {
    const id = req.params.timerId;
    Timer.update({_id: id}, {$set: req.body})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'Timer UPDATED successfully !',
            request: {
                type: 'PUT',
                description: 'PUT_Timer_BY_ID',
                url: 'http://localhost:3000/timers/' + id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.timers_delete_timer = (req, res, next) => {
    Timer.remove({_id: req.params.timerId})
    .exec()
    .then (result => {
        console.log(result);
        res.status(200).json({
            message: 'Timer DELETED successfully !',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/timers/',
                body: {projectId: 'ID'}
            }
        })
        .catch(err);
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}