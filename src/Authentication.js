import { useEffect, useState } from "react";
import useAuthChange from "./custom-hooks/useAuthChange";
import { auth } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import ErrorArray from "./ErrorArray";
import  {Navigate} from "react-router-dom";


export default function Authentication(){
    const [signinTrue, setSigninTrue] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [errorTitle, setErrorTitle] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);

    const [userSubmitted, setUserSubmitted] = useState(false);

    const authstatus = useAuthChange()[0];

    useEffect(()=>{
        async function check(){
            if(signinTrue){
                signInWithEmailAndPassword(auth, email, password)
                .then(

                )
                .catch(error=>{
                    setErrorTitle("Credentials Invalid");
                    setErrorDescription(error.message);
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
                })
                .catch(error=>{
                    setErrorTitle("Credentials Invalid");
                    setErrorDescription(error.message);
        })   
            }
            setUserSubmitted(false);
        }
        if(userSubmitted) check();
    }, [userSubmitted])
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setUserSubmitted(true);
    }

    const handleForm = ()=>{
        return (
            <form className="Auth" onSubmit={e => handleSubmit(e)}>
                <h1>{(signinTrue && "Sign In") || (!signinTrue && "Sign Up")}</h1>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required/>
                {!signinTrue && <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required/>}
                <input type="submit"/>
                <div className="link" onClick={()=>setSigninTrue(!signinTrue)}>{(signinTrue && "Sign Up") || (!signinTrue && "Sign In")}</div>
            </form>
        )
    }

    if(authstatus && JSON.parse(localStorage.getItem('uid'))){
        return <Navigate to="/"/>;
    }

    return ( 
    <>
        {errorTitle && errorDescription && <ErrorArray title={errorTitle} description={errorDescription}/>}
        {!authstatus && handleForm()}
    </>

    )
}