import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Students from '../components/student/allStudent';
import axios from 'axios';
import AddStudent from '../components/student/addStudent';

export default class Student extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: "",
            persons: [],
            students: [],
            newStudentData: {
                fname: '',
                lname: '',
                email: '',
                address: '',
                phone: '',
                username: '',
                password: '',
                c_password: ''
            },
            newStudentModal: false
        }
    }

    componentDidMount(){
        const t = localStorage.getItem("token")
        
        axios.get(`http://localhost:3000/student/`,{
            headers : {'Authorization': `Bearer ${t}`
        }})
        .then(res => {
            if(res.status === 200){
                const persons = res.data.student;
                this.setState({ persons });       
            }
            else{                
                this.setState({ error: res.data.error });
                this.props.history.push('/login')
            }
            
        })
        .catch(err=>{
            this.setState({ error: err.response.data.error})
        })
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Classroom WebStack | Student</title>
                </Helmet>           
                <AddStudent />
                <Students data={this.state.persons}/>      
            </React.Fragment>
        )
    }
}
