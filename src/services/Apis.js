import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";


export const registerfunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/auth/register`,data)
}

export const userVerify = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/auth/otp`,data)
}

export const loginfunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/auth/login`,data)
}

export const requestFunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/auth/connect`,data)
}

export const empRegister = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/employer/register`,data)
}

export const empVerify = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/employer/otp`,data)   
}

export const createJobFunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/employer/createJob`,data)
}



