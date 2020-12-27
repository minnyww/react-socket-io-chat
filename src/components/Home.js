import { Space } from "antd";
import Button from "antd/lib/button/button";
import Input from "antd/lib/input";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
   const [roomName, setRoomName] = useState("");
   const [userName, setUserName] = useState("");
   const history = useHistory();

   const handleRoomNameChange = (event) => {
      setRoomName(event.target.value);
   };

   const handleUserNameChange = (event) => {
      setUserName(event.target.value);
   };

   const gotoChatRoom = () => {
      history.push({
         pathname: `/${roomName}`,
         state: { userName: userName },
      });
   };

   return (
      <div style={{ margin: "18px" }}>
         <Space direction="vertical" style={{ width: "100%" }} align="center">
            <Input
               type="text"
               placeholder="Room"
               value={roomName}
               onChange={handleRoomNameChange}
            />
            <Input
               type="text"
               placeholder="Name"
               value={userName}
               onChange={handleUserNameChange}
            />
            <Button type="primary" onClick={() => gotoChatRoom()}>
               Join room
            </Button>
         </Space>
      </div>
   );
};

export default Home;
