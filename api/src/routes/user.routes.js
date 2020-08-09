module.exports = (app) => {
    const user = require("../controllers/user.controller");
    app.route('/users')
        .post(user.create);
    app.route('/users')
        .get(user.findAll);
    app.route('/users/:id')
        .get(user.findOne)
    app.route('/users/:id')
        .put(user.update);
    app.route("/users/:id")
        .delete(user.delete)
};