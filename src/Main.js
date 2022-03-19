import Create from "./Create";
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import useAuthChange from "./custom-hooks/useAuthChange";
import { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";
import Pending from "./Pending";
import Completed from "./Completed";
import ErrorArray from "./ErrorArray";
import { Navigate } from "react-router-dom";
import Header from "./Header";

export default function Main(){
  // Getting user info
  const uid = useAuthChange()[0];

  // Getting the array of tasks of user
  const [DocArray, setDocArray] = useState();

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);

  // Converting the string of time and date into date 
  function convertToDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    let today = new Date().toLocaleDateString("in", {year:"numeric", day:"2-digit", month:"2-digit"});
    date = [day, mnth, date.getFullYear()].join("/")
    if(today === date){
      return "Today";
    }
    return date;
  }  

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
  },[uid])

  console.log(uid)

  if(!uid && !JSON.parse(localStorage.getItem('uid'))){
    return <Navigate to="Auth"/>
  }

  return(
      <>
        <Header/>

        {errorTitle && errorDescription && <ErrorArray title={errorTitle} desc={errorDescription}/>}

        {
          uid && <Create/>  
        }
        
        {
          uid && DocArray && DocArray.map(doc=>{
            if(doc.type === "pending"){
              return <Pending key={doc.id} id={doc.id} task={doc.task} date={doc.created && convertToDate(doc.created.toDate())}/>
            }
            else if(doc.type === "completed"){
              return <Completed key={doc.id} id={doc.id} task={doc.task} date={doc.created && convertToDate(doc.created.toDate())}/>
            }
            return doc
          })
        }
      </>
  )
}