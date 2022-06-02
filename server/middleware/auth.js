const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);

        await User.findById(user.userId).populate({ path: "roles" })
            .then((userData) => {
                req.user = userData;
                next();
            })
            .catch(err => {
                console.log(err);
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user"
                });
            });

    }
    catch (e) {
        res.status(401).json({
            success: false,
            error: e
        });
    }
};

module.exports.verifyAdmin = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: false,
            message: "Unauthorised"
        });
    }
    let verified = false;
    await Promise.all(
        req.user.roles.map(role => {
            if (role.role_title == "SUPER ADMIN" || role.role_title == "SUPER_ADMIN") {
                verified = true;
            }
        })
    );

    if (verified == false) {
        return res.status(401).json({
            status: false,
            message: "Unauthorised"
        });
    }
    next();
};