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

  socket.on("new-user-joined", name => {
    socket.username = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send-chat-message", data => {
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit("user-left", socket.username);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
