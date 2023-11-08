import axios from "axios";
import { instance } from "./axiosInterceptor";

export const commonrequest = async(methods,url,body,header)=>{
    let config = {
        method:methods,
        url,
        headers:header ? header 
        :{
            "Content-Type":"application/json"
        },
        data:body
    }

    // axios instance
    return instance(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })
}