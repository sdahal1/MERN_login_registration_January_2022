const express = require("express")
const cors = require("cors")
const cookies = require("cookie-parser");
require("dotenv").config();



const app = express(); 
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}));


app.use(cookies()) //Now our app has the abilities to send and read cookies with each request/response


require("./server/config/mongoose.config")



require('./server/routes/user.routes')(app)



app.listen( port, () => console.log(`Listening on port: ${port}`) );