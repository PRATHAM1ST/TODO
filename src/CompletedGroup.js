import { doc, updateDoc, deleteDoc, getDoc, collection } from "firebase/firestore"
import useAuthChange from "./custom-hooks/useAuthChange"
import { db } from "./FirebaseConfig"

export default function Completed({id, task, date, creatorId, creatorName}){
    const uid = useAuthChange()[0];

    const groupId = JSON.parse(localStorage.getItem("groupId"))

    function handleClick(){
        updateDoc(doc(db, "Groups", groupId, groupId, id), {type: "pending"});
    }

    function handleDelete(){
        deleteDoc(doc(db, "Groups", groupId, groupId, id));
    }

    return(
        <div className="task completed">
            <p className="Date">{date}</p>
            <span className="material-icons" onClick={handleClick}>check_circle</span>
            <div id={id}>
                {task}
            </div>
            {uid !== creatorId && <p className="creator"><i>By:</i> {creatorName}</p>}
            {uid === creatorId && <span className="material-icons" onClick={handleDelete}>delete</span>}
        </div>
    )
}