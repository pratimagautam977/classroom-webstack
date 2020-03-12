import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div className="empty">
                <img src="./images/not_found.svg" alt="noclass"/>
                <h5 className="mt-3">Your Resources Are Not Available!</h5>
            </div>
        )
    }
}
