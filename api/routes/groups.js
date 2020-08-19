const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'Handling GET requests to /groups'
    });
});

router.post('/', (req, res, next) => {
    const group = {
        name: req.body.name,
        projectId: req.body.projectId
    }
    res.status(201).json({
        message:'Handling POST requests to /groups',
        group: group
    });
});

router.get('/:groupId', (req, res, next) => {
        res.status(200).json({
            message:'Get group ID',
            groupId: req.params.groupId
        });
});

router.put('/:groupId', (req, res, next) => {
    res.status(200).json({
        message:'Update group ID',
        groupId: req.params.groupId
    });
});

router.delete('/:groupId', (req, res, next) => {
    res.status(200).json({
        message:' Delete group ID',
        groupId: req.params.groupId
    });
});

module.exports = router;