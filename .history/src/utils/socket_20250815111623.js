import io from "socket.io-client";

export const createSocketConnection = () => {
  const token = localStorage.getItem("token"); // get JWT
  const isLocal = location.hostname === "localhost";

  return io(isLocal ? "http://localhost:3000" : "/", {
    path: "/api/socket.io",
    auth: { token }, // send token in handshake
    withCredentials: true,
  });
};
