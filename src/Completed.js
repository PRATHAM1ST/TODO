import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import useAuthChange from "./custom-hooks/useAuthChange"
import { db } from "./FirebaseConfig"

export default function Completed({id, task, date}){
    const uid = useAuthChange()[0];

    function handleClick(){
        updateDoc(doc(db, uid, id), {type: "pending"});
    }

    function handleDelete(){
        deleteDoc(doc(db, uid, id));
    }

    return(
        <div className="task completed">
            <p className="Date">{date}</p>
            <span className="material-icons" onClick={handleClick}>check_circle</span>
            <div id={id}>
                {task}
            </div>
            <span className="material-icons" onClick={handleDelete}>delete</span>
        </div>
    )
}