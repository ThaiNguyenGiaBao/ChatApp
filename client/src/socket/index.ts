import { io, Socket } from "socket.io-client";

let socket: Socket;

const initailizeSocket = (
  username: string | undefined,
  userId: string | undefined
) => {
  if (socket === undefined) {
    socket = io("http://localhost:8000", {
      query: {
        username,
        userId,
      },
    });
  }
  return socket;
};

const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not initialized");
  }
  return socket;
};

export { initailizeSocket, getSocket };
