import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import KhaltiCheckout from "khalti-web";
import {useParams} from "react-router-dom";

export default function Payment() {
    let { id } = useParams(); 

    const t = localStorage.getItem('token');

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3000/pay/"+ id, {
            headers : {'Authorization': `Bearer ${t}`}
        })
        .then(res => {
            //console.log(res.data);
            setAmount(res.data.res[0].amount);
            
        })
    }, [id, t])

    const paymentData = (payload) =>{
        // console.log(payload);
        let data = {
            token : payload.token,
            amount: payload.amount,
            request_id : id
        }
        axios.post("http://localhost:3000/pay/verify", data)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err.response)
        })
    }
    //let paymentData = this.paymentData
    let config = {
        // replace this key with yours
        "publicKey": "test_public_key_77b8d623c3a64240a832fafbb9d378ba",
        "productIdentity": "1234567890",
        "productName": "Course Fee",
        "productUrl": "https://icp.edu.np/payfee",
        "eventHandler": {
            onSuccess (payload) {
                // hit merchant api for initiating verfication
                // console.log(payload);
                paymentData(payload)
            },
            // onError handler is optional
            onError (error) {
                // handle errors
                console.log(error);
            },
            onClose () {
                console.log('widget is closing');                
            }
        }
    };
    
    const checkout = new KhaltiCheckout(config);
    return (
        <>
            <Helmet>
                <title>Classroom WebStack | Payment</title>
            </Helmet>
            <button className="btn-violet mt-2" onClick={() =>checkout.show({amount: amount})}><img src="./images/khalti_logo.png"  alt="khalti"/>Pay Fees</button>
        </>
    )
}
