import React, { Component } from 'react'
import axios from 'axios'

export default class API extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas :[],
            error: "",
            persons: []
        };
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

        console.log(this.state.datas)
    }
    
    render() {
        return (
            
            <ul>
                {this.state.error}
                { this.state.persons.map(person => 
                    <div key={person.ID}  className="dp">
                        <img className="round_img" alt="" src={person.img} width="40px" />
                        <li >{person.fname} {person.lname}</li>
                    </div>
                )}
            </ul>
        )
    }
}
