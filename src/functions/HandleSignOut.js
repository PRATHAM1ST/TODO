import { getAuth, signOut } from "firebase/auth";
import RemoveLocalStorage from "./RemoveLocalStorage";
import { Navigate } from "react-router-dom";

export default function HandleSignOut(){
    const auth = getAuth();
    signOut(auth);
    RemoveLocalStorage();
    return <Navigate to="/Auth" />;
}