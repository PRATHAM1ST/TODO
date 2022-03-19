import { getAuth, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import useAuthChange from "./custom-hooks/useAuthChange"
import { db } from "./FirebaseConfig";

export default function Header(){
    // Get and updating Authentication 
    const [auth, setAuth]  = useAuthChange();

    const navigate = useNavigate();

    const gid = JSON.parse(localStorage.getItem("groupId"));

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

    const handleCopy = () =>{
        navigator.clipboard.writeText(JSON.parse(localStorage.getItem("groupId")));
    }

    const handleGroupDelete = ()=>{
        deleteDoc(doc(db, "Groups", gid));
        localStorage.removeItem("groupName");
        localStorage.removeItem("groupPassword");
        localStorage.removeItem("groupId");
        navigate('/');
    }

    if(!localStorage.getItem("uid")){
        navigate('/Auth');
    }

    return(
        auth && 
        <div className="header">
            Welcome to
            <h1>{JSON.parse(localStorage.getItem("groupName"))} <span className="material-icons" onClick={handleGroupDelete}>delete</span></h1>
            <h3>Group Id: <u onClick={handleCopy}>{gid}</u></h3>
            <br/>
            <div className="links">
                <div className="link" onClick={handleSignOut}>Sign Out</div>
                <Link to="/" >
                    <div className="link">
                        Personal Tasks
                    </div>
                </Link>
                <Link to="/GroupAuth">
                    <div className="link">
                        Join Group / Create Group
                    </div>
                </Link>
            </div>
        </div>
    )
}