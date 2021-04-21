const express = require("express");
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

dotenv.config({path:'config.env'})
const port = process.env.PORT  || 8000 ;

require("./Database/connec")

//middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({origin:"http://localhost:3000",credentials:true,"Access-Control-Allow-Origin":"http://localhost:3000"}))
app.use(require('./Routes/route'))


//middleware
if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'))
}



app.listen(port, () => {
  console.log(`Listning on localhost:${port}`);
});
