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
  // This checks for 
  const global = useGlobal()[0];

  console.log(global)

  return (
    <div className="App">
      {/* Header is contains name and links for signout and global task */}
      <Header/>

      {/* SignIn and SignUp */}
      <Authentication/>
      
      {/* Main is for user's personal task */}
      {!global && <Main/>}

      {/* Global is where everyone adds the task */}
      {global && <Global/>}
    </div>
  );
}

export default App;
