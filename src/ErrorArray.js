import { useEffect, useState } from "react";
import Error from "./Error";

export default function ErrorArray({title = "Error Occured", desc = "Unkown Reason..."}){

    const[errorArray, setErrorArray] = useState([])

    console.log(errorArray)

    useEffect(()=>{
        setErrorArray([{title: title, description: desc}, ...errorArray]);
    },[title, desc])

    return(
        errorArray && <div className="error-array">
            {
            errorArray.map(err=>{
                return <Error key={errorArray.length} title={err.title} description={err.description}/>
            })
            }
        </div>
    )
}