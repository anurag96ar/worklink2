import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";


export const registerfunction = async(data)=>{
   
    return await commonrequest("POST",`/auth/register`,data)
}

export const userVerify = async(data)=>{
    return await commonrequest("POST",`/auth/otp`,data)
}

export const loginfunction = async(data)=>{
    return await commonrequest("POST",`/auth/login`,data)
}

export const requestFunction = async(data)=>{
    return await commonrequest("POST",`/auth/connect`,data)
}

export const empRegister = async(data)=>{
    return await commonrequest("POST",`/employer/register`,data)
}

export const empVerify = async(data)=>{
    return await commonrequest("POST",`/employer/otp`,data)   
}

export const createJobFunction = async(data)=>{
    return await commonrequest("POST",`/employer/createJob`,data)
}



