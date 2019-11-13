import React from 'react';

export default function AllStaffs(props) {
    const items = props.data;
    if (items.length === 0){
        return <h4>You have no staff...</h4>
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
                            <a href=" " className="button_table" onClick={() => props.onUpdate(staff.staffID)}><span className="icon-pencil" /></a>
                            <a href=" " className="button_table" onClick={() => props.onDelete(staff.staffID)}><span className="icon-delete" /></a>
                        </div>
                    </div>
                )
            }
            
        </div>
    )}
}