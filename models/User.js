const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        accountType: {
            type: ["User", "Admin"],
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
        },
        token:{
            type: String,
            time: true,
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema);