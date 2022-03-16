import { getAuth, signOut } from "firebase/auth";
import useAuthChange from "./custom-hooks/useAuthChange"
import useGlobal from "./custom-hooks/useGlobal";

export default function Header(){
    // Get and updating Authentication 
    const [auth, setAuth]  = useAuthChange();

    const [global, setGlobal] = useGlobal();

    const handleSignOut = () =>{
        // Getting user data
        const auth = getAuth();
        signOut(auth);
        setAuth(false);
    }

    const handleGlobal = ()=>{
        setGlobal(true);
    }

    const handleMain = ()=>{
        setGlobal(false);
    }

    return(
        auth && 
        <div className="header">
            Welcome
            <h1>{getAuth().currentUser.displayName}</h1>
            <div className="links">
                <div className="link" onClick={handleSignOut}>Sign Out</div>
                {/* {!global && <div className="link" onClick={handleGlobal}>Global Tasks</div>} */}
                {/* {global && <div className="link" onClick={handleMain}>Personal Tasks</div>} */}
            </div>
        </div>
    )
}