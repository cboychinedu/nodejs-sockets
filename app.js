// Importing the necessary modules 
const fs = require("fs"); 
const express = require("express"); 
const path = require("path"); 
const chalk = require("chalk"); 
const http = require('http');  
const app = express(); 
const server = http.createServer(app)
const io = require("socket.io")(server, { cors: {origin: "*"}}) 
const bodyParser = require("body-parser"); 

// Importing the router 
const home = require("./routes/routes"); 

// Using some necessary middleware function 
app.use(express.json()); 
app.use(express.static('static')); 
app.use(express.static('./static/css')); 
app.use(express.static('./static/javascript')); 
app.use(express.static('./static/templates')); 
app.use(express.urlencoded({ extended: true })); 

// Setting the views 
app.set('view engine', 'ejs'); 

// Setting the host, and port 
const PORT = process.env.PORT || 3001; 
const HOST = process.env.HOST || "localhost"; 

// Setting the routes 
app.use("/", home) 

// Creating a connection 
io.on('connection', (socket) => {
    console.log("User connected: " + socket.id)
    console.log(socket.userId); 
    // console.log('A user connected');
    
    // 
    socket.on("message", (data) => {
        socket.broadcast.emit("message", data)
    })
}); 

// Running the server 
server.listen(PORT, HOST, () => {
    // running the server 
    let serverMessage = chalk.magenta(`The server is running on: ${HOST + ":" + PORT}`); 
    console.log(serverMessage); 
}); 


