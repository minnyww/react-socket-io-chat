import { useCallback, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const ALL_MESSAGE_EVENT = "allMessageEvent";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId, userName) => {
   const [messages, setMessages] = useState([]); // Sent and received messages
   const socketRef = useRef();
   console.log("messages : ", messages);

   const joinEvent = useCallback(() => {
      socketRef.current.emit("joined", {
         body: userName,
      });
      console.log("joinedllll");
   }, [userName]);

   useEffect(() => {
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
         query: { roomId },
      });

      joinEvent();

      socketRef.current.on("joined", (event) => {
         console.log("event : ", event);
      });

      // Listens for incoming messages
      socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
         console.log("message : ", message);
         console.log("socketRef.current : ", socketRef.current.id);
         const incomingMessage = {
            ...message,
            ownedByCurrentUser: message.senderId === socketRef.current.id,
            name: userName,
            time: Date.now(),
         };
         //  console.log("incomingMessage ::: ", incomingMessage);
         setMessages((messages) => [...messages, incomingMessage]);
      });

      socketRef.current.on(ALL_MESSAGE_EVENT, (message) => {
         let formatMessage = message.map((item) => {
            return {
               ...item,
               ownedByCurrentUser: item.senderId === socketRef.current.id,
               name: userName,
               time: Date.now(),
            };
         });
         //  setMessages(() => [...formatMessage]);
      });

      // Destroys the socket reference
      // when the connection is closed
      return () => {
         socketRef.current.disconnect();
      };
   }, [joinEvent, roomId, userName]);

   // Sends a message to the server that
   // forwards it to all users in the same room
   const sendMessage = (messageBody) => {
      console.log("messageBody", messageBody);
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
         body: messageBody,
         senderId: socketRef.current.id,
      });
   };

   return { messages, sendMessage };
};

export default useChat;
