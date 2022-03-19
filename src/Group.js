import CreateGroup from "./CreateGroup";
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import useAuthChange from "./custom-hooks/useAuthChange";
import { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";
import PendingGroup from "./PendingGroup";
import CompletedGroup from "./CompletedGroup";
import Header from "./GroupHeader";
import { useNavigate } from "react-router-dom";

export default function Group(){
  // Getting user info
  const uid = useAuthChange()[0];

  // Getting the array of tasks of user
  const [DocArray, setDocArray] = useState();

  const navigate = useNavigate();


  // Converting the string of time and date into date 
  function convertToDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);

    let fiveDays = new Date(new Date().setDate(new Date().getDate() - 5)).toDateString() === str.toDateString();
    if(fiveDays){
      return "5 Days";
    }
    let fourDays = new Date(new Date().setDate(new Date().getDate() - 4)).toDateString() === str.toDateString();
    if(fourDays){
      return "4 Days";
    }
    let threeDays = new Date(new Date().setDate(new Date().getDate() - 3)).toDateString() === str.toDateString();
    if(threeDays){
      return "3 Days";
    }
    let twoDays = new Date(new Date().setDate(new Date().getDate() - 2)).toDateString() === str.toDateString();
    if(twoDays){
      return "2 Days";
    }
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() === str.toDateString();
    if(yesterday){
      return "Yesterday";
    }
    let today = new Date().toDateString() === str.toDateString();
    if(today){
      return "Today";
    }

    date = [day, mnth, date.getFullYear()].join("/")
    if(today === date){
      return "Today";
    }
    return date;
  }  
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
  },[uid])

  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("uid"))){
      navigate('/Auth');
    }
    if(!gid){
    navigate('/GroupAuth');
    }
  }, [])
  

  

  return(
      <>

        <Header/>

        {
          (gid && uid) && <CreateGroup/>  
        }

        {
          (gid && uid) && (DocArray && DocArray.map(doc=>{
            if(doc.type === "pending"){
              return <PendingGroup key={doc.id} id={doc.id} task={doc.task} date={doc.created && convertToDate(doc.created.toDate())} creatorId={doc.creatorId} creatorName={doc.creatorName}/>
            }
            else if(doc.type === "completed"){
              return <CompletedGroup key={doc.id} id={doc.id} task={doc.task} date={doc.created && convertToDate(doc.created.toDate())} creatorId={doc.creatorId} creatorName={doc.creatorName}/>
            }
            return doc
          }))
        }
      </>
  )
}