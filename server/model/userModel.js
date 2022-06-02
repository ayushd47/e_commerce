const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    email_verification_code: { type: String },
    email_verified: { type: Boolean, default: false },
    email_verified_time: { type: String },
    gender: { type: String, enum: ['male', 'female', 'others'] },
    address: { type: String },
    state: { type: String },
    avatar: { type: String },
    mobile_no: { type: String },
    desc: { type: String },
    date_of_birth: { type: Date },
    password_reset_code: { type: String },
    password_reset_request_date: { type: String },
    last_password_change_date: { type: String },
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    mobile_prefix: { type: String, default: "977" },
    otp: { type: String },
    otp_verified: { type: Date },
    opt_generated_at: { type: Date },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    signup: { type: String, enum: ["email", "facebook", "gmail"], default: "email" },
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    let user = this.ObjectId
    delete user.__v
    return user;
}
const User = mongoose.model("User", userSchema)
module.exports = User;