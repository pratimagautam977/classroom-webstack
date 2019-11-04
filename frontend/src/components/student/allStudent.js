import React from 'react';

export default function Students(props) {
    return (
        <div className="cards">
            <ul>
            {
                props.data.map(student => 
                    <div key={student.studID}  className="dp">
                        <img  className="round_img" alt="" src={student.img} width="40px" />
                        <li >{student.fname} {student.lname}</li>
                    </div>
                )
            }
            </ul>
        </div>
    )
}