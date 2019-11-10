import React from 'react';

export default function Students(props) {
    const items = props.data;
    if (items.length === 0){
        return <h4>You have no student...</h4>
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
                            <a className="button_table" onClick={() => props.onUpdate(student.studID)}><span className="icon-pencil" /></a>
                            <a className="button_table" onClick={() => props.onDelete(student.studID)}><span className="icon-delete" /></a>
                        </div>
                    </div>
                )
            }
            
        </div>
    )}
}