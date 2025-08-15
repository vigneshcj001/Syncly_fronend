import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import { api } from "../../utils/api"; // axios wrapper

const Chatroom = () => {
  const { targetUserID } = useParams();
  const user = useSelector((store) => store.user);
  const userID = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetProfile, setTargetProfile] = useState(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 1. Fetch chat history + target profile
  useEffect(() => {
    if (!userID) return;

    const fetchChatData = async () => {
      try {
        const { data } = await api.get(`/chat/${targetUserID}`);
        if (data.success) {
          setMessages(
            data.messages.map((msg) => ({
              userName:
                msg.senderId === userID
                  ? user.userName
                  : data.targetProfile.userName,
              avatar:
                msg.senderId === userID
                  ? user.avatar
                  : data.targetProfile.avatar,
              text: msg.text,
              sent: msg.senderId === userID,
            }))
          );
          setTargetProfile(data.targetProfile);
        }
      } catch (err) {
        console.error("Error fetching chat data", err);
      }
    };

    fetchChatData();
  }, [userID, targetUserID, user.userName, user.avatar]);

  // 2. Socket.io connection
  useEffect(() => {
    if (!userID) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      userName: user.userName,
      avatar: user.avatar,
      userID,
      targetUserID,
    });

    socket.on("messageReceived", ({ userName, avatar, text }) => {
      setMessages((prev) => [
        ...prev,
        { userName, avatar, text, sent: userName === user.userName },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userID, targetUserID, user.userName, user.avatar]);

  // 3. Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      userName: user.userName,
      avatar: user.avatar,
      userID,
      targetUserID,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center px-4 pt-6">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center gap-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
        <img
          src={targetProfile?.avatar || ""}
          alt={`${targetProfile?.userName || ""}'s avatar`}
          className="w-11 h-11 rounded-full object-cover"
        />
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Chat with {targetProfile?.userName || "Loading..."}
        </h1>
      </header>

      {/* Messages */}
      <ol
        className="w-full max-w-4xl flex flex-col gap-3 mt-6 flex-1 overflow-y-auto overflow-x-hidden"
        style={{ maxHeight: "70vh" }}
      >
        {messages.map((msg, index) => {
          const isLast = index === messages.length - 1;
          const noTail = !isLast && messages[index + 1]?.sent === msg.sent;

          return (
            <li
              key={index}
              className={`relative max-w-[80%] break-words px-4 py-2 rounded-2xl text-sm md:text-base
                ${
                  msg.sent
                    ? `bg-blue-500 text-white self-end ${
                        !noTail
                          ? "rounded-br-none after:content-[''] after:absolute after:right-[-6px] after:bottom-0 after:w-0 after:h-0 after:border-t-[12px] after:border-t-blue-500 after:border-l-[12px] after:border-l-transparent"
                          : ""
                      }`
                    : `bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                        !noTail
                          ? "rounded-bl-none after:content-[''] after:absolute after:left-[-6px] after:bottom-0 after:w-0 after:h-0 after:border-t-[12px] after:border-t-gray-200 dark:after:border-t-gray-700 after:border-r-[12px] after:border-r-transparent"
                          : ""
                      }`
                }`}
            >
              {msg.text}
            </li>
          );
        })}
        <div ref={messagesEndRef} />
      </ol>

      {/* Input Bar */}
      <div className="w-full max-w-4xl flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 active:scale-95 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
