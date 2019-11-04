import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import AllStaffs from '../components/staff/allStaff';

export default class Staff extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: "",
            staffs: []
        }
    }

    componentDidMount(){
        const t = localStorage.getItem('token');

        axios.get(`http://localhost:3000/staff/`, {
            headers: {'Authorization': `Bearer ${t}`}
        })
        .then(res => {
            if(res.status === 200){
                const staffs = res.data.staff;
                this.setState({ staffs });
            }
            else{
                this.setState({error: res.data.error});
                this.props.history.push('/login');
            }
        })
        .catch(err => {
            this.setState({ error: err.response.data.error })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Classroom WebStack | Staff</title>
                </Helmet>
            
                <AllStaffs data={this.state.staffs}/>        
            </React.Fragment>
        )
    }
}