import { getCookiesObject } from "./getCookieObject"
import { toast } from "react-toastify";

export let isLoggedInCheck=(navigate)=>{

    if( getCookiesObject()===null)
    {
        navigate("/signin");
        toast.success("Logged Out.Please Login to continue");        
    }
}