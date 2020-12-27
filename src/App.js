import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Chatroom from "./components/Chatroom";
import Home from "./components/Home";
import bg from "./bg.jpg";

const BackgroundSite = styled.div`
   background-image: url(${bg});
   height: 100%;
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
`;

function App() {
   return (
      <Router>
         <Switch>
            <BackgroundSite>
               <Route exact path="/" component={Home} />
               <Route exact path="/:roomId" component={Chatroom} />
            </BackgroundSite>
         </Switch>
      </Router>
   );
}

export default App;
