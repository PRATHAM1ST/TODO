import { useEffect, useState } from "react";
import useAuthChange from "./custom-hooks/useAuthChange";
import { Signin, CreateUser } from "./FirebaseConfig";

export default function Authentication(){
    const [signinTrue, setSigninTrue] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [userSubmitted, setUserSubmitted] = useState(false);

    const authstatus = useAuthChange()[0];


    useEffect(()=>{
        async function auth(){
            if(signinTrue){
                Signin(email, password)
            }
            else{
                CreateUser(email, password, name)    
            }
            setUserSubmitted(false);
        }
        if(userSubmitted) auth();
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

    return ( 
    <>
        {!authstatus && handleForm()}
    </>

    )
}