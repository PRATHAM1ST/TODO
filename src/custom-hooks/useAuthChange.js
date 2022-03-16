import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useAuthChange(){
    const [user, setUser] = useState(false);

    const auth = getAuth()

    
    useEffect(()=>{
        onAuthStateChanged(auth, (e) => {
            if(e) {
                setUser(e.uid)
            }
            else {
                setUser(false)
            } 
        });
    }, [auth])
    return [user, setUser];
}