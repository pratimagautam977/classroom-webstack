import React from 'react';

export default function Students(props) {
    const items = props.data;
    if (items.length === 0){
        return (
            <div className="empty">
                <img src="./images/no_student.svg" alt="nostudent"/>
                <h5 className="mt-3">No Student Added Yet!</h5>
            </div>)
    }
    else{
    return (
        <div className="cards">            
            {
                
                props.data.map(student => 
                    <div key={student.studID}  className="dp">
                        <div className="round_img">
                            <img  className="" alt="" src={student.img} width="40px" />

                        </div>
                        <div className="name_area">
                            <li >{student.fname} {student.lname}</li>
                        </div>
                        <div className="button_controller">
                            <button className="button_table" onClick={() => props.onUpdate(student.studID)}><span className="icon-pencil" /></button>
                            <button className="button_table" onClick={() => props.onDelete(student.studID)}><span className="icon-delete" /></button>
                        </div>
                    </div>
                )
            }
            
        </div>
    )}
}