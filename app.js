const express = require('express');
const socketio=require("socket.io")
const app=express();
const path = require('path');
const http=require('http');
const server=http.createServer(app);
const io=socketio(server)



// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("recieve-location",{id:socket.id,...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
