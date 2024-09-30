import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const userOnline = new Map();

export const getUserSocketId = (userId: string) => {
  return userOnline.get(userId);
};

io.on("connection", (socket) => {
  console.log("User connected: ", socket.handshake.query.username);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userOnline.set(userId, socket.id);
    io.emit("user-online", Array.from(userOnline.keys()));
  }
  

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    userOnline.delete(userId);
    io.emit("user-online", Array.from(userOnline.keys()));
  });
});

export { server, io, app };
