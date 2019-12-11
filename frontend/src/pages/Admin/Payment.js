import React, { Component } from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import KhaltiCheckout from "khalti-web";

export default class Payment extends Component {
    paymentData = (payload) =>{
        // console.log(payload);
        let data = {
            token : payload.token,
            amount: payload.amount
        }
        axios.post("http://localhost:3000/institute/payment", data)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }
    render() {
        let paymentData = this.paymentData
        let config = {
            // replace this key with yours
            "publicKey": "live_public_key_31f14f369ef84e51b6d76af0eea21300",
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
        
        let checkout = new KhaltiCheckout(config);
        
        return (
            <React.Fragment>
            <Helmet>
              <title>Classroom WebStack | Payment</title>
            </Helmet>
            <button className="btn-violet mt-2" onClick={() =>checkout.show({amount: 1000})}><img src="./images/khalti_logo.png"  alt="khalti"/>Pay Fees</button>
            
          </React.Fragment>
        )
    }
}
