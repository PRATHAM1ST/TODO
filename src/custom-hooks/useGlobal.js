import { useEffect, useState } from "react";

export default function useGlobal(){
    const[global, setGlobal] = useState(false);

    useEffect(()=>{
        console.log(1)
    },[global])

    return [global, setGlobal];
}