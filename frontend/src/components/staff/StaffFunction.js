import React, {useState, useEffect} from 'react'
import axios from 'axios';
var url = "http://localhost:3000/"



export const AddStaff = newStaff => {
    
    const token = localStorage.getItem("token");
    return axios
    .post( url + "staff/", newStaff, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        console.log(token)
        return res.data;
        
    }).catch(err =>{      
        console.log(err.response.data.error)
    })
}

export const GetStaffs=() =>{
    const token = localStorage.getItem("token");
    return axios.get( url + "staff/", {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        console.log(token)
        return res;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}
export const GetStaff=(id) =>{
    const token = localStorage.getItem("token");
    return axios.get( url + `staff/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}

export const UpdateStaff=(data, id) =>{
    const token = localStorage.getItem("token");
    return axios.put( url + `staff/${id}`,data, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}
export const DeleteStaff=(id) =>{
    const token = localStorage.getItem("token");
    return axios.delete( url + `staff/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}