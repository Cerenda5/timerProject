module.exports = (app) => {
    const project = require("../controllers/project.controller");
    app.route('/projects')
        .post(project.create);
    app.route('/projects')
        .get(project.findAll);
    app.route('/projects/:id')
        .get(project.findOne)
    app.route('/projects/:id')
        .put(project.update);
    app.route("/projects/:id")
        .delete(project.delete)
};