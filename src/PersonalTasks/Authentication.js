import { useState } from "react";
import  { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../FirebaseConfig";
import useAuthChange from "../custom-hooks/useAuthChange";


export default function Authentication(){
    const [signinTrue, setSigninTrue] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [error, setError] = useState(false);

    const navigate = useNavigate(null);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(signinTrue){
            signInWithEmailAndPassword(auth, email, password)
            .then(
                navigate("/")
            )
            .catch(()=>{
                setError(true);
            })
        }
        else{
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                // setting up name
                updateProfile(user.user, {
                displayName: name
                })
                localStorage.setItem("NameOfUser", JSON.stringify(name));
                navigate("/");
            })
            .catch(()=>{
                setError(true);
            })   
        }
    }

    useAuthChange();
    
    return ( 
    <>
        <form className="Auth" onSubmit={e => handleSubmit(e)}>
            <h1>{(signinTrue && "Sign In") || (!signinTrue && "Sign Up")}</h1>
            <div className="error">{error && "Invalid Credentials"}</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required/>
            {!signinTrue && <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required/>}
            <input type="submit"/>
            <div className="link" onClick={()=>setSigninTrue(!signinTrue)}>{(signinTrue && "Sign Up") || (!signinTrue && "Sign In")}</div>
    </form>
    </>

    )
}