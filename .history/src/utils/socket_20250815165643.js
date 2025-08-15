// utils/socket.js
import io from "socket.io-client";

export const createSocketConnection = () => {
  const socketOptions = {
    path: "/api/socket.io", // ✅ must match server
    withCredentials: true,
  };

  if (location.hostname === "localhost") {
    return io("http://localhost:3000", socketOptions);
  } else {
    return io("/", socketOptions);
  }
};
