import { useEffect, useState } from "react";

export default function useGlobal(){
    const [global, setGlobal] = useState(false);
    const [g, setg] = useState(false)

    useEffect(()=>{
        g && setGlobal(!global) || global && setGlobal(!global);
    },[g])

    return [global, setg];
}