import axios from 'axios';
var url = "http://localhost:3000/"

export const AddStudent = newStudent => {
    let token = localStorage.getItem("token")
    return axios
    .post( url + "student/", newStudent, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}

export const GetStudents=() =>{
    let token = localStorage.getItem("token")
    return axios.get( url + "student/", {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    });
}
export const GetStudent=(id) =>{
    let token = localStorage.getItem("token")
    return axios.get( url + `student/${id}`, {        
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    });
}

export const UpdateStudent=(data, id) =>{
    let token = localStorage.getItem("token")
    return axios.put( url + `student/${id}`,data, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}
export const DeleteStudent=(id) =>{
    let token = localStorage.getItem("token")
    return axios.delete( url + `student/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}