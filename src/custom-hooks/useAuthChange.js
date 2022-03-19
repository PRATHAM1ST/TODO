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
            }
            else {
                setUser(false)
                localStorage.setItem('uid', JSON.stringify(''));
            } 
        });
    }, [auth])
    
    return [user, setUser];
}