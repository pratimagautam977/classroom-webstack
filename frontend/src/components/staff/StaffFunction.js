import axios from 'axios';
var url = "http://localhost:3000/"

const token = localStorage.getItem("token");
export const AddStaff = newStaff => {
    
    return axios
    .post( url + "staff/", newStaff, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}

export const GetStaffs=() =>{
    return axios.get( url + "staff/", {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    });
}
export const GetStaff=(id) =>{
    return axios.get( url + `staff/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res;
    });
}

export const UpdateStaff=(data, id) =>{
    return axios.put( url + `staff/${id}`,data, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}
export const DeleteStaff=(id) =>{
    return axios.delete( url + `staff/${id}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(res => {
        return res.data;
    });
}