import React, { Component } from 'react';

class CardBorder extends Component {
    render() {
        return (
            <div>
                <div className="card border-primary">
                    <div className="card-body">
                    <h4 className="card-title">{this.props.title}</h4>
                    {this.props.container}
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default CardBorder;