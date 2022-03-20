import { Link, useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

import { db } from "../FirebaseConfig";
import RemoveLocalStorage from "../functions/RemoveLocalStorage";

export default function Header(){
    const navigate = useNavigate();

    const gid = JSON.parse(localStorage.getItem("groupId"));

    const handleSignOut = () =>{ 
        // Getting user data
        const auth = getAuth();
        signOut(auth);
        RemoveLocalStorage();
        navigate("/Auth");
    }

    const handleCopy = () =>{
        navigator.clipboard.writeText(gid);
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
        <div className="header">
            Welcome to
            <h1>{JSON.parse(localStorage.getItem("groupName"))} <span className="material-icons" onClick={handleGroupDelete}>delete</span></h1>

            <h3>Group Id: <u onClick={handleCopy}>{gid}</u></h3>
            
            <br/>
            <div className="links">
                <div className="link" onClick={handleSignOut}>
                    <span className="material-icons">logout</span>
                </div>

                <Link to="/" >
                    <div className="link">
                        <span className="material-icons">person</span>
                    </div>
                </Link>
                <Link to="/GroupAuth">
                    <div className="link">
                        <span className="material-icons">login</span>
                        <span className="material-icons">groups</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}