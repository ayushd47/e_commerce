const User = require('../model/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper = require("../helpers/index");
const httpStatus = require("http-status");

// @route POST user/register
// @desc register new account
exports.register = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            let msg = "Email already exits";
            const data = { email: req.body.email };
            return helper.response.sendErrorResponse({
                res,
                status: httpStatus.CONFLICT,
                msg,
                data,
            });
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) {
                    return helper.response.sendErrorResponse({
                        res,
                        status: httpStatus.INTERNAL_SERVER_ERROR,
                        msg: "Internal Server Error",
                        err,
                    });
                } else {
                    req.body.password = hash;
                    req.body.email = req.body.email.toLowerCase();
                    const newUser = User.create(req.body);
                    return helper.response.sendSuccessResponse({
                        res,
                        status: httpStatus.OK,
                        msg: "User successfully registered",
                        newUser,
                    });
                }
            });
        }
    } catch (error) {
        next(error);
    }
};

// @route POST user/login
// @desc login to account
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase(),
            is_deleted: false,
        });

        if (!user) {
            let msg = "Login Failed !! Incorrect email or password";
            return helper.response.sendErrorResponse({
                res,
                status: httpStatus.CONFLICT,
                msg,
            });
        } else {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (err) throw err;
                if (result) {
                    const response_body = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        gender: user.gender,
                        address: user.address,
                    };
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                    return helper.response.sendSuccessResponse({
                        res,
                        status: httpStatus.OK,
                        msg: "Login Successful !!",
                        data: response_body,
                        token,
                    });
                }

                return helper.response.sendErrorResponse({
                    res,
                    status: httpStatus.NOT_FOUND,
                    msg: "Login Failed !! Incorrect email or password",
                });
            });
        }
    } catch (error) {
        next(error);
    }
};
