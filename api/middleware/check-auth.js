const jwt = require('jsonwebtoken');


// Protection of private routes
module.exports = (req, res, next) => {
    try {
        // Put the token in the header of the request and parse it
        const token = req.headers.authorization.split(" ")[1];
        //decode the token to verify
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        console.log(req.body.token);
       
        console.log(decoded);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Auth failed, bad token !"
        });
    }
};