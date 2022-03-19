// css
import './css/root.css';
import './css/general.css';
import './css/create.css';
import './css/authentication.css';
import './css/task.css';
import './css/header.css';
import './css/error.css';
// js
import Main from "./Main";
import Authentication from './Authentication';
import Global from './Global';

import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />}/>
          <Route exact path="Auth" element={<Authentication />} />
          <Route exact path="Global" element={<Global />} />
          {/* <Route path="about" element={<About />} /> */}
        </Routes>
      </div>
  );
}

export default App;
