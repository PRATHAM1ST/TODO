import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RemoveLocalStorage from '../functions/RemoveLocalStorage';
import { useNavigate } from 'react-router-dom';

export default function useAuthChange(){
    const [user, setUser] = useState(false);

    const auth = getAuth();

    const navigate = useNavigate(null);

    // When authentication is done 
    useEffect(()=>{
        onAuthStateChanged(auth, (e) => {
            if(e) {
                setUser(e.uid);
                localStorage.setItem('uid', JSON.stringify(e.uid));
                localStorage.setItem('NameOfUser', JSON.stringify(e.displayName));
                navigate("/");
            }
            else {
                setUser(false); 
                RemoveLocalStorage();
                navigate("/Auth");
            } 
        });
    }, [auth])
    
    return [user, setUser];
}