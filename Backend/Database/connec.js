const mongoose = require("mongoose");

const DB = process.env.DATABASE;
// console.log(`${DB}`);

mongoose
  .connect(DB, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connection is maded with remote databse 🚀");
  })
  .catch((err) => {
    console.log(err);
  });
