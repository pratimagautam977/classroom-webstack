import React, { Component } from 'react'

export default class AddTaskModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: false
        }
    }

    open = () => {
        this.setState({ toggle: true });
    };
    close = () => {
        this.setState({ toggle: false });
    };
    
    render() {
        return (
            <React.Fragment>
                <div className="btn_holder">
                <button className="btn--blue" onClick={this.open}>
                    {this.props.btn}
                </button>
                </div>
                <div className={this.state.toggle ? "m-menu -active" : "m-menu "}>
                <div className="modal_highlight">
                    <div className="modal_main">
                    <div className="modal_head">
                        <div className="modal_title">
                        <h2>{this.props.title}</h2>
                        </div>
                        <div className="modal_btn">
                        <button className="cross" onClick={this.close}>
                            ⓧ
                        </button>
                        </div>
                    </div>
                    <div className="modal_body">{this.props.body}</div>
                    <div className="modal_footer">{this.props.footer}</div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        )
    }
}
