// css
import './css/root.css';
import './css/general.css';
import './css/create.css';
import './css/authentication.css';
import './css/task.css';
import './css/header.css';
import './css/error.css';
// js
import {Main} from "./PersonalTasks/Main";
import Authentication from './PersonalTasks/Authentication';
import Group from './GroupTasks/Group';
import GroupAuth from './GroupTasks/GroupAuth';

// router
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />}/>
          <Route exact path="Auth" element={<Authentication />} />
          <Route exact path="Group" element={<Group />} />
          <Route exact path="GroupAuth" element={<GroupAuth />} />
        </Routes>
      </div>
  );
}

export default App;
