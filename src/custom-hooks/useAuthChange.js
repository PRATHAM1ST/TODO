import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import  {Navigate} from "react-router-dom";

export default function useAuthChange(){
    const [user, setUser] = useState(false);

    const auth = getAuth()

    // When authentication is done 
    useEffect(()=>{
        onAuthStateChanged(auth, (e) => {
            if(e) {
                setUser(e.uid);
                localStorage.setItem('uid', JSON.stringify(e.uid));
                localStorage.setItem('NameOfUser', JSON.stringify(e.displayName));
            }
            else {
                setUser(false); 
                localStorage.removeItem("uid");
                localStorage.removeItem("groupName");
                localStorage.removeItem("groupPassword");
                localStorage.removeItem("groupId");
                localStorage.removeItem("NameOfUser");
            } 
        });
    }, [auth])
    
    return [user, setUser];
}