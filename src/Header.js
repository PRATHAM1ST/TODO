import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import useAuthChange from "./custom-hooks/useAuthChange"

export default function Header(){
    // Get and updating Authentication 
    const [auth, setAuth]  = useAuthChange();

    const handleSignOut = () =>{ 
        // Getting user data
        const auth = getAuth();
        localStorage.removeItem("uid");
        localStorage.removeItem("groupName");
        localStorage.removeItem("groupPassword");
        localStorage.removeItem("groupId");
        localStorage.removeItem("NameOfUser");
        signOut(auth);
        setAuth(false);
    }

    const handleGlobal = ()=>{
        <Navigate to="Global" />
    }

    return(
        auth && 
        <div className="header">
            Welcome
            <h1>{getAuth().currentUser.displayName}</h1>
            <div className="links">
                <div className="link" onClick={handleSignOut}>Sign Out</div>
                <div className="link">
                   <Link to="Group">Group Task</Link>
                </div>
            </div>
        </div>
    )
}