import axios from "axios";
var url = "http://localhost:3000/";

export const AddClass = newClass => {
  const token = localStorage.getItem("token");
  return axios
    .post(url + "classroom/", newClass, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};

export const GetClasses = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(url + "classroom/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res;
    });
};

export const GetClass = id => {
  const token = localStorage.getItem("token");
  return axios
    .get(url + `classroom/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data.classroom;
    });
};

export const GetAssignment = id => {
  const token = localStorage.getItem("token");
  return axios
    .post(
      url + `classroom/assignment/`,
      { id },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      return res.data;
    });
};

export const UpdateClass = (data, id) => {
  const token = localStorage.getItem("token");
  return axios
    .put(url + `classroom/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};

export const DeleteClass = id => {
  const token = localStorage.getItem("token");
  return axios
    .delete(url + `classroom/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};

export const GetExcludedStudent = id => {
  const token = localStorage.getItem("token");
  return axios
    .get(url + `classroom/${id}/student`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};

export const AddStudentToClass = (id, studid) => {
  const token = localStorage.getItem("token");
  return axios
    .post(
      url + `classroom/${id}/student`,
      { uuid: studid },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      return res.data;
    });
};

export const GetExcludedStaff = id => {
  const token = localStorage.getItem("token");
  return axios
    .get(url + `classroom/${id}/staff`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};

export const AddStaffToClass = (id, staffid) => {
  const token = localStorage.getItem("token");
  return axios
    .post(
      url + `classroom/${id}/staff`,
      { uuid: staffid },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      return res.data;
    });
};

export const DeleteStudent = (id, studid) => {
  const token = localStorage.getItem("token");
  return axios
    .delete(
      url + `classroom/${id}/student`,
      {
        headers: { Authorization: `Bearer ${token}` },  
        data: { uuid: studid }
      }
    )
    .then(res => {
      return res.data;
    });
};

export const DeleteStaff = (id, staffid) => {
  const token = localStorage.getItem("token");
  return axios
    .delete(
      url + `classroom/${id}/staff`,
      {
        headers: { Authorization: `Bearer ${token}` },
        data:{ uuid: staffid }
      }
    )
    .then(res => {
      return res.data;
    });
};
