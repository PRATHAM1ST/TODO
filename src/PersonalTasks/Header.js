import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import RemoveLocalStorage from "../functions/RemoveLocalStorage";

export default function Header(){
    const userName = JSON.parse(localStorage.getItem('NameOfUser'))
    const navigate = useNavigate(null);

    const handleSignOut = () =>{
        const auth = getAuth();
        signOut(auth);
        RemoveLocalStorage();
        navigate("/Auth");
    }

    const handleGroupTask = ()=>{
        navigate("/Group");
    }

    if(!userName){
        navigate("/Auth");
    }

    return(
        <div className="header">
            Welcome
            <h1>{userName}</h1>
            <br />
            <div className="links">
                <div className="link" onClick={handleSignOut}>
                    <span className="material-icons">logout</span>
                </div>
                <div className="link" onClick={handleGroupTask}>
                    <span className="material-icons">groups</span>
                </div>
            </div>
        </div>
    )
}