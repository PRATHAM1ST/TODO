import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react"
import { db } from "../FirebaseConfig";

export default function CreateGroup(){

    const [addTask, setAddTask] = useState('');
    const [newTask, setNewTask] = useState(false);


    const taskRef = useRef(null);

    const uid = JSON.parse(localStorage.getItem("uid"));

    function handleNewTask (e){
        if(e.key === "Enter" && addTask){
            handleArrowClick();
        }
        else{
            setAddTask(e.target.innerText.trim());
        }
    }

    function handleArrowClick(){
        const gid = JSON.parse(localStorage.getItem("groupId"))
        addTask && addDoc(collection(db, "Groups", gid, gid), {
            task: addTask, 
            type: "pending",
            created: serverTimestamp(),
            creatorId: uid,
            creatorName: JSON.parse(localStorage.getItem('NameOfUser'))
        }).catch(error=>{

        })
        setAddTask('');
        setNewTask(false);
        taskRef.current.innerText = '';
    }

    function handleFocus(){
        if(!addTask){
            setNewTask(false)
        }
    }

    function handleClick(){
        setNewTask(!newTask)
    }

    

    useEffect(()=>{
        newTask && taskRef.current.focus();
    }, [taskRef, newTask])

    return(
        <>
            {
                !newTask && <div className="create" onClick={handleClick}>
                    Lets Add a Task
                </div>
            }
            {newTask && <div className="createBox">
                            <div className="newtask" contentEditable="true" onKeyUp={(e)=>handleNewTask(e)} onBlurCapture={handleFocus} ref= {taskRef}>
                            </div>
                            <span className="material-icons enter-arrow" onClick={handleArrowClick}>arrow_forward_ios</span>
                        </div>
            }
        </>
    )
}