import { Row, Space, Typography } from "antd";
import Button from "antd/lib/button/button";
import Col from "antd/lib/grid/col";
import Input from "antd/lib/input";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useChat from "./useChat";
import styled, { css } from "styled-components";

const ChatHeader = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1rem;
`;

const Message = styled.div`
   margin-top: 1rem;
   color: white;
   border-radius: 20px;
   padding: 8px;

   ${(props) =>
      props.fromMe &&
      css`
         background: #0b93f6;
         align-self: flex-end;
      `}
   ${(props) =>
      !props.fromMe &&
      css`
         background: #3e4042;
         align-self: flex-start;
      `}
`;

const ChatContainer = styled.div`
   border: solid 1px #eee;
   display: flex;
   flex-direction: column;
   padding: 10px;
   height: 75vh;
   overflow-y: scroll;
   margin-bottom: 1rem;
   color: white;
`;

const InputMessageContainer = styled(Space)`
   width: 100%;
   .ant-space-item {
      width: 100%;
   }
`;

const Chatroom = () => {
   const { roomId } = useParams();
   const chatEndRef = useRef();
   const {
      state: { userName },
   } = useLocation();
   console.log("userName : ", userName);
   const { messages, sendMessage } = useChat(roomId, userName);
   const [newMessage, setNewMessage] = useState("");

   const handleNewMessageChange = (event) => {
      setNewMessage(event.target.value);
   };

   const handleSendMessage = () => {
      sendMessage(newMessage);
      setNewMessage("");
   };

   useEffect(() => {
      chatEndRef.current.scrollIntoView();
   }, [messages]);

   return (
      <Row>
         <Col
            xl={8}
            md={24}
            xs={24}
            style={{ border: "1px solid lightgrey", padding: "1rem" }}
         >
            <ChatHeader>
               <Typography.Text strong style={{ color: "white" }}>
                  Name: {userName}
               </Typography.Text>
               <Typography.Text strong style={{ color: "white" }}>
                  Room: {roomId}
               </Typography.Text>
            </ChatHeader>
            <ChatContainer>
               {messages.map((message, i) => (
                  <Message fromMe={message.ownedByCurrentUser} key={i}>
                     {message.body}
                  </Message>
               ))}
               <div ref={chatEndRef} />
            </ChatContainer>
            <InputMessageContainer align="center" direction="vertical">
               <Input.TextArea
                  onPressEnter={() => handleSendMessage()}
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  placeholder="Write message..."
               />
               <Button block type="primary" onClick={handleSendMessage}>
                  Send
               </Button>
            </InputMessageContainer>
         </Col>
         <Col xl={{ span: 14, push: 1 }} md={24} xs={24}>
            <h2 style={{ color: "white" }}>To : Pang</h2>
         </Col>
      </Row>
   );
};

export default Chatroom;
