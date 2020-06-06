import axios from 'axios';
var url = "http://localhost:3000/"

export const AddTask = (newTask, route) => {

    
    const token = localStorage.getItem("token");
    return axios
    .post( url + route+"/calendar/", newTask, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        console.log(token)
        return res.data;
        
    }).catch(err =>{      
        console.log(err.response.data.error)
    })
}

export const GetTasks=(route) =>{
    const token = localStorage.getItem("token");
    return axios.get( url + route+"/calendar/", {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        console.log(token)
        return res;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}
export const GetTask=(id, route) =>{
    const token = localStorage.getItem("token");
    return axios.get( url + route+`/calendar/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}

export const UpdateTask=(data, id, route) =>{
    const token = localStorage.getItem("token");
    return axios.put( url + route + `/calendar/${id}`,data, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}
export const DeleteTask=(id, route) =>{
    const token = localStorage.getItem("token");
    return axios.delete( url + route+ `/calendar/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    }).catch(err => {      
        console.log(err.response.data.error)
    });
}
