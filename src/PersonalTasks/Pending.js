import { useRef } from "react";

import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { db } from "../FirebaseConfig";
import useAuthChange from "../custom-hooks/useAuthChange";

export default function Pending({id, task, date}){
    const taskid = id;
    const TaskRef = useRef(null);

    const uid = useAuthChange()[0];

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
        updateDoc(doc(db, uid, taskid), { type: "completed" });
    }

    function handleDelete(){
        deleteDoc(doc(db, uid, taskid));
    }

    
    return(
        <div className="task pending" onClick={()=>TaskRef.current.focus()}>
            <p className="Date">{date}</p>
            <span className="material-icons" onClick={e=>handleCheckbox(e)}>radio_button_unchecked</span>
            <div id={taskid} contentEditable="true" value={task} onKeyDown={(e)=>handleChange(e)} ref={TaskRef} suppressContentEditableWarning={true} onBlurCapture={e=>handleSave(e)} spellCheck={false}>
                {task}
            </div>
            <span className="material-icons" onClick={handleDelete}>delete</span>
        </div>
    )
}