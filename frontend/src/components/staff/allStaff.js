import React from 'react';

export default function AllStaffs(props) {
    return (
        <div className="cards">
            <ul>
            {
                props.data.map(staff =>
                    <div key={staff.staffID}  className="dp">
                        <img  className="round_img" alt="" src={staff.img} width="40px" />
                        <li >{staff.fname} {staff.lname}</li>
                    </div>
                )
            }
            </ul>
        </div>
    )
}