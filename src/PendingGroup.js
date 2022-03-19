import { deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import useAuthChange from "./custom-hooks/useAuthChange";
import { db } from "./FirebaseConfig";

export default function PendingGroup({id, task, date, creatorId, creatorName}){
    const taskid = id;
    const [taskData, setTaskData] = useState(task);
    const TaskRef = useRef(null);

    const uid = useAuthChange()[0];

    const groupId = JSON.parse(localStorage.getItem("groupId"))

    const handleSave = (e)=>{
        setTaskData(e);
    }

    function handleChange(e){
        if(e.key === "Enter"){
            setTaskData(e.target.innerText.trim());
            TaskRef.current.blur();
        }
    }

    function handleCheckbox(e){
        updateDoc(doc(db, "Groups", groupId, groupId, taskid), { type: "completed" });
    }

    function handleDelete(){
        deleteDoc(doc(db, "Groups", groupId, groupId, taskid));
    }

    useEffect(()=>{
        uid && taskData && updateDoc(doc(db, "Groups", groupId, groupId, taskid), { task:`${taskData}`, type: "pending" });
        uid && !taskData && handleDelete();
    }, [taskData])

    
    return(
        <div className="task pending" onClick={()=>TaskRef.current.focus()}>
            <p className="Date">{date}</p>
            <span className="material-icons" onClick={e=>handleCheckbox(e)}>radio_button_unchecked</span>
            <div id={taskid} contentEditable={uid === creatorId} value={taskData} onKeyDown={(e)=>handleChange(e)} ref={TaskRef} suppressContentEditableWarning={true} onBlurCapture={e=>handleSave(e.target.innerText.trim())}>
                {taskData}
            </div>
            {uid !== creatorId && <p className="creator"><i>By:</i> {creatorName}</p>}
            {uid === creatorId && <span className="material-icons" onClick={handleDelete}>delete</span>}
        </div>
    )
}