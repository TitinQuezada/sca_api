const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@scacluster.dr050.mongodb.net/ScaDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose;
