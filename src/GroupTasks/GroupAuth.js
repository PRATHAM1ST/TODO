import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { addDoc, collection, getDoc, doc } from "firebase/firestore";

import { db } from "../FirebaseConfig";

import { sha512 } from "js-sha512";

export default function GroupAuth(){
    const uid = JSON.parse(localStorage.getItem("uid"));


    const [groupId, setGroupId] = useState('');
    const [groupPassword, setGroupPassword] = useState('');
    const [groupName, setGroupName] = useState('');
    const [createGroup, setCreateGroup] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate(null);


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(createGroup){
            addDoc(collection(db, "Groups"), {
                groupName: groupName,
                creator: uid,
                password: sha512(groupPassword),
                taskCount: 0
            }).then((e)=>{
                console.log(e.id, e);
                localStorage.setItem("groupId", JSON.stringify(e.id));
                localStorage.setItem("groupPassword", JSON.stringify(groupPassword));
                localStorage.setItem("groupName", JSON.stringify(groupName));
                navigate('/Group');
                setError(false);
            }).catch((e)=>{
                console.error(e)
                setError(true)
            })
            setGroupId('');
            setGroupName('');
            setGroupPassword('');
        }
        else{

            getDoc(doc(db, "Groups", groupId)).then((e)=>{
                console.log(e);
                if(e.exists() && e.data().password === sha512(groupPassword)){
                    localStorage.setItem("groupId", JSON.stringify(e.id));
                    localStorage.setItem("groupPassword", JSON.stringify(groupPassword));
                    localStorage.setItem("groupName", JSON.stringify(e.data().groupName));
                    navigate('/Group');
                    setError(false);
                }
                else if(!e.exists()){
                    setError(true);
                    console.error("group dont exists")
                }
                else{
                    setError(true);
                    console.error("password is invalid")
                }
            })
            setGroupId('');
            setGroupName('');
            setGroupPassword('');
        }
    }

    if(!uid){
        console.log(uid)
        navigate("/Auth");
    }


    return(
        <>
            <form className="Auth" onSubmit={e => handleSubmit(e)}>

                <h1>{(createGroup && "Create Group") || (!createGroup && "Join Group")}</h1>
                
                {error && <div className="error">Invalid Credentials</div>}
                
                {!createGroup && <input type="text" value={groupId} onChange={e=>setGroupId(e.target.value)} placeholder="Group Id" required/>}
                
                {createGroup && <input type="text" value={groupName} onChange={e=>setGroupName(e.target.value)} placeholder="Group Name" required/>}
                
                <input type="password" value={groupPassword} onChange={e=>setGroupPassword(e.target.value)} placeholder="Password" required/>
                
                <input type="submit"/>
                
                <div className="AuthLinks">
                    <div className="link" onClick={()=>{setCreateGroup(!createGroup); setError(false)}}>{(!createGroup && "Create Group") || (createGroup && "Join Group")}</div>
                    <Link to="/">
                        <div className="link" onClick={()=>setCreateGroup(!createGroup)}>
                            Personal Task  
                        </div>
                    </Link> 
                </div>
            </form>
        </>
    )
}