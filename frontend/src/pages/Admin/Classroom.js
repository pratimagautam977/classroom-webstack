//rcc => for class-based component
import React, { Component } from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import AllClass from '../../components/classroom/allClass';

export default class Classroom extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: "",
            classes: []
        }
    }

    componentDidMount(){
        const t = localStorage.getItem('token');

        axios.get(`http://localhost:3000/classroom`, {
            headers: {'Authorization': `Bearer ${t}`}
        })
        .then(res => {
            if(res.status === 200){
                const classes = res.data.classroom;
                this.setState({ classes });   
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
                    <title>Classroom WebStack | Classroom</title>
                </Helmet>                
                <AllClass data={this.state.classes}/>
            </React.Fragment>
        )
    }
}
