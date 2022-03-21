import { useRef } from "react";

import { deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../FirebaseConfig";

export default function PendingGroup({id, task, date, creatorId, creatorName}){
    const taskid = id;
    const TaskRef = useRef(null);

    const uid = JSON.parse(localStorage.getItem("uid"));

    const groupId = JSON.parse(localStorage.getItem("groupId"))


    const handleSave = (e)=>{
        let update = e.target.innerText.trim();
        if(!update){
            return handleDelete()
        }
        if(task !== update){
            updateDoc(doc(db, uid, taskid), { task: update, type: "pending", created: serverTimestamp()});
        }
    }

    function handleChange(e){
        if(e.key === "Enter"){
            handleSave(e);
            TaskRef.current.blur();
        }
    }

    function handleCheckbox(e){
        updateDoc(doc(db, "Groups", groupId, groupId, taskid), { type: "completed" });
    }

    function handleDelete(){
        deleteDoc(doc(db, "Groups", groupId, groupId, taskid));
    }

    
    return(
        <div className="task pending" onClick={()=>TaskRef.current.focus()}>
            <p className="Date">{date}</p>
            
            <span className="material-icons" onClick={e=>handleCheckbox(e)}>radio_button_unchecked</span>
            
            <div id={taskid} contentEditable={uid === creatorId} value={task} onKeyDown={(e)=>handleChange(e)} ref={TaskRef} suppressContentEditableWarning={true} onBlurCapture={e=>handleSave(e.target.innerText.trim())}>
                {task}
            </div>
            
            {uid !== creatorId && <p className="creator"><i>By:</i> {creatorName}</p>}
            
            {uid === creatorId && <span className="material-icons" onClick={handleDelete}>delete</span>}
        </div>
    )
}