const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  const uri="mongodb+srv://Sooraj:sooraj123@atlascluster.wgkibno.mongodb.net/doctorapp"
  try {
    await mongoose.connect(uri);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;