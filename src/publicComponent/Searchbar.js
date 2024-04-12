import React, { Component } from 'react';

class Searchbar extends Component {
    render() {
        return (
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                <input
                    className="form-control"
                    type="text"
                    placeholder={this.props.label}
                    aria-label={this.props.label}
                    aria-describedby={this.props.btnID}
                />
                <button className="btn btn-primary" id={this.props.btnID} type="button">
                    <i className="fas fa-search" />
                </button>
                </div>
            </form>
        );
    }
}

export default Searchbar;