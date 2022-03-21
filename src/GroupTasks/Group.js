import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';

import { db } from "../FirebaseConfig";
import CalculateDateTime from "../functions/CalculateDateTime";

import Header from "./GroupHeader";
import CreateGroup from "./CreateGroup";
import PendingGroup from "./PendingGroup";
import CompletedGroup from "./CompletedGroup";

export default function Group(){
  // Getting user info
  const uid = JSON.parse(localStorage.getItem("uid"));

  // Getting the array of tasks of user
  const [DocArray, setDocArray] = useState();

  const navigate = useNavigate();

  const gid = JSON.parse(localStorage.getItem('groupId'))

  // When we get uid, connection of realtime database
  useEffect(()=>{
    if(uid && gid){
      const q = query(collection(db, "Groups", gid, gid), orderBy("created", "desc"));
      onSnapshot(q, snapshot => {
        setDocArray(snapshot.docs.map(doc=>{
          return(
            {id: doc.id, ...doc.data()}
          )
        }))
    })
    }
  },[uid, gid])

  if(!uid){
    navigate("/");
  }

  if(!gid){
    navigate("/GoupAuth");
  }

  return(
      <>

        <Header/>

        <CreateGroup/>  

        {
          DocArray && DocArray.map(doc=>{
            if(doc.type === "pending"){
              return <PendingGroup key={doc.id} id={doc.id} task={doc.task} date={doc.created && CalculateDateTime(doc.created.toDate())} creatorId={doc.creatorId} creatorName={doc.creatorName}/>
            }
            else if(doc.type === "completed"){
              return <CompletedGroup key={doc.id} id={doc.id} task={doc.task} date={doc.created && CalculateDateTime(doc.created.toDate())} creatorId={doc.creatorId} creatorName={doc.creatorName}/>
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