// css
import './css/root.css';
import './css/general.css';
import './css/create.css';
import './css/authentication.css';
import './css/task.css';
import './css/header.css';
// js
import Main from "./Main";
import Authentication from './Authentication';
import Header from './Header';
import Global from './Global';
import useGlobal from './custom-hooks/useGlobal';

function App() {

  const global = useGlobal()[0];

  console.log(global)

  return (
    <div className="App">
      <Header/>
      <Authentication/>
      {!global && <Main/>}
      {global && <Global/>}
    </div>
  );
}

export default App;
