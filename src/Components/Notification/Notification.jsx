import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io("https://insu-backend-9dr5.onrender.com", {
      transports: ["websocket"], // Enforce WebSocket connection
      withCredentials: true,    // Ensure credentials are sent (if required by your backend)
    });

    // Log connection success or errors
    socket.on("connect", () => {
      console.log("Connected to Socket.io server:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Listen for insurance expiry notifications
    socket.on("insurance-expiry-notification", (data) => {
      console.log("Notification received:", data);
      if (data?.message) {
        setNotifications((prev) => [...prev, data]);
        toast.info(data.message, { position: "top-center" });
      } else {
        console.warn("Invalid notification data received:", data);
      }
    });

    // Cleanup on component unmount
    return () => {
      console.log("Socket disconnected");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            {notif.message} - Expiry Date:{" "}
            {notif.expiryDate ? new Date(notif.expiryDate).toLocaleDateString() : "Unknown"}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Notification;
