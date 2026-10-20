const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.LOCAL_HOST);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = ConnectDB;