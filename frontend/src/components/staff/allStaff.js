import React from 'react';

export default function AllStaffs(props) {
    const items = props.data;
    if (items.length === 0){
        return (
            <div className="empty">
                <img src="./images/no_staff.svg" alt="nostaff"/>
                <h5 className="mt-3">No Staff Added Yet!</h5>
            </div>)
    }
    else{
    return (
        <div className="cards">            
            {
                props.data.map(staff => 
                    <div key={staff.staffID}  className="dp">
                        <div className="round_img">
                            <img  className="" alt="" src={staff.img} width="40px" />

                        </div>
                        <div className="name_area">
                            <li >{staff.fname} {staff.lname}</li>
                        </div>
                        <div className="button_controller">
                            <button className="button_table" onClick={() => props.onUpdate(staff.staffID)}><span className="icon-pencil" /></button>
                            <button className="button_table" onClick={() => props.onDelete(staff.staffID)}><span className="icon-delete" /></button>
                        </div>
                    </div>
                )
            }
            
        </div>
    )}
}