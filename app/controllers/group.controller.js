const db = require("../models");
const Group = db.groups;

// Create and Save a new User
exports.create = (req, res) => {
// Validate request
if (!req.body.groupName) {
  res.status(400).send({ message: "Content can not be empty!" });
  return;
}

// Create a Group
const group = new Group({
  groupName: req.body.groupName,
  admin: req.body.admin,
  members: req.body.members,
  projects: req.body.projects,
});

// Save Group in the database
  group.save(group)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Group."
    });
  });
};

// Retrieve all Groups from the database.
exports.findAll = (req, res) => {
  const groupName = req.query.groupName;
  var condition = groupName ? { groupName: { $regex: new RegExp(groupName), $options: "i" } } : {};

  Group.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving groups."
      });
    });
};

// Find a single Group with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Group.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Group with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Group with id=" + id });
    });
  
};

// Update a Group by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Group with id=${id}. Maybe Group was not found!`
        });
      } else res.send({ message: "Group was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Group with id=" + id
      });
    });
};

// Delete a Group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Group.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Group with id=${id}. Maybe Group was not found!`
        });
      } else {
        res.send({
          message: "Group was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Group with id=" + id
      });
    });
  
};