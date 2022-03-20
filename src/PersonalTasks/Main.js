import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";

import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from "../FirebaseConfig";

import CalculateDateTime from "../functions/CalculateDateTime";
import useAuthChange from "../custom-hooks/useAuthChange";

import Header from "./Header";
import Create from "./Create";
import Pending from "./Pending";
import Completed from "./Completed";

function Main(){
  // Getting user info
  // const uid = useAuthChange()[0];
  const uid = JSON.parse(localStorage.getItem("uid"));

  // Getting the array of tasks of user
  const [DocArray, setDocArray] = useState();

  useEffect(()=>{
    if(uid){
      const q = query(collection(db, uid), orderBy("created", "desc"));
      onSnapshot(q, snapshot => {
        setDocArray(
          snapshot.docs.map(doc=>{ 
            return (
              {id: doc.id, ...doc.data()}
              )
          })
        )
      })
    }
    else{
      setDocArray('')
      return <Navigate to="Auth" />
    }

  },[uid])

  return(
      <>
        <Header/>

        <Create/>  
        
        {
          DocArray && DocArray.map(doc=>{
            if(doc.type === "pending"){
              return <Pending key={doc.id} id={doc.id} task={doc.task} date={doc.created && CalculateDateTime(doc.created.toDate())}/>
            }
            else if(doc.type === "completed"){
              return <Completed key={doc.id} id={doc.id} task={doc.task} date={doc.created && CalculateDateTime(doc.created.toDate())}/>
            }
            return doc
          })
        }

        {
        !DocArray && 
        <div className="Dummy-tasks">
          <div className="Dummy-task"></div>
          <div className="Dummy-task"></div>
          <div className="Dummy-task"></div>
        </div>
        }
      </>
  )
}

export {Main}