import React from 'react';
import jwt_decode from 'jwt-decode';
import Institute from './Admin/Dashboard'
import Staffs from './Staff/Dashboard';
import {Redirect, withRouter } from "react-router-dom";

function Dashboard(props) {
    // now install a jwt parse package
   
    const token = localStorage.getItem("token");
    if (token !== null){
        const decoded = jwt_decode(token)
        if(decoded.isAdmin === true){
            return <Institute />
        }
        else if(decoded.isStaff === true){
            return <Staffs />
        }
        else if(decoded.isStudent === true){
            return "Dear Students :) We are soon bring service for you. -By your respectful Admin"
        }
        else{
            return <Redirect to='/login'/>;
        }
    }
    else{
        return <Redirect to='/login'/>;
    }
}
export default withRouter(Dashboard);