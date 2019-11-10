import axios from 'axios';
var url = "http://localhost:3000/"

const token = localStorage.getItem("token");
export const AddStudent = newStudent => {
    return axios
    .post( url + "student/", newStudent, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}

export const GetStudents=() =>{
    return axios.get( url + "student/", {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    });
}
export const GetStudent=(id) =>{
    return axios.get( url + `student/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    });
}

export const UpdateStudent=(data, id) =>{
    return axios.put( url + `student/${id}`,data, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}
export const DeleteStudent=(id) =>{
    return axios.delete( url + `student/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}