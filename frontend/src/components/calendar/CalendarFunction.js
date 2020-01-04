import axios from 'axios';
var url = "http://localhost:3000/"

export const AddTask = newTask => {
    
    const token = localStorage.getItem("token");
    return axios
    .post( url + "institute/calendar/", newTask, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        console.log(token)
        return res.data;
        
    }).catch(err =>{      
        console.log(err.response.data.error)
    })
}

export const GetTasks=() =>{
    const token = localStorage.getItem("token");
    return axios.get( url + "institute/calendar/", {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        console.log(token)
        return res;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}
export const GetTask=(id) =>{
    const token = localStorage.getItem("token");
    return axios.get( url + `institute/calendar/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}

export const UpdateTask=(data, id) =>{
    const token = localStorage.getItem("token");
    return axios.put( url + `institute/calendar/${id}`,data, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    }).catch(err =>{      
        console.log(err.response.data.error)
    });
}
export const DeleteTask=(id) =>{
    const token = localStorage.getItem("token");
    return axios.delete( url + `institute/calendar/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    }).catch(err => {      
        console.log(err.response.data.error)
    });
}
