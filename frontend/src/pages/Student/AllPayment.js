import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function AllPayment() {
    const [fees, setfees] = useState([])
    const t = localStorage.getItem('token');
    useEffect(() => {
        axios.get("http://localhost:3000/pay/student", {
            headers : {'Authorization': `Bearer ${t}`}
        })
        .then(res => {
            // console.log(res.data);
            setfees(res.data)                        
        })
        .catch(err =>{
            console.log(err.response)
        })
    }, [t])
    return (
        
        <div className="cards">            
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Amount</th>
                    <th scope="col"></th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fees.map((fee,index) =>(                            
                            <tr key={index}>
                                <th className="py-3" scope="row">{index +1}</th>
                                <td className="py-3" >{fee.requestDate}</td>
                                <td className="py-3" >{fee.amount}</td>
                                <td >
                                    {fee.status ? "" :<Link to={`/pay/${fee.requestID}`} className="btn btn-primary btn-sm">Pay Now</Link>}
                                </td>
                                <td>
                                    {fee.status ? <h4><span className="badge badge-success">Paid</span></h4> : <h4><span className="badge badge-danger">Pending</span></h4>}                                        
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>            
        </div>
    )
}
