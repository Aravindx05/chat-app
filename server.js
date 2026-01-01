const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("New user connected");
  socket.emit("chat-message", "h");
    socket.on("send-chat-message", message => {
        console.log(message);
        socket.broadcast.emit("chat-message", message);
    });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
