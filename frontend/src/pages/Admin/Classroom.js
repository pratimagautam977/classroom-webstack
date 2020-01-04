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
            classes: [],
            load: false
        }
    }

    componentDidMount(){
        const t = localStorage.getItem('token');
        setTimeout(
            function(){
                axios.get(`http://localhost:3000/classroom`, {
                headers: {'Authorization': `Bearer ${t}`}
                })
                .then(res => {
                    if(res.status === 200){
                        const classes = res.data.classroom;
                        this.setState({ classes, load:true });   
                    }
                    else{
                        this.setState({error: res.data.error});
                        this.props.history.push('/login');
                    }
                })
                .catch(err => { 
                    this.setState({ error: err.response.data.error, load: true })
                })
            }.bind(this)
            , 5000
        )
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Classroom WebStack | Classroom</title>
                </Helmet>  
                {
                    this.state.load ? 
                    <AllClass data={this.state.classes}/> 
                    : <div style={{height: "90vh", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <div className="loader" id="loader-1"></div>
                    </div>
                }              
                
            </React.Fragment>
        )
    }
}
