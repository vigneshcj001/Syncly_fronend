
//import store from "../redux/chatSlice"
import io from "socket.io-client";
import { BASE_URL } from "./const";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/api/", { path: "/api/socket.io" });
  }
};