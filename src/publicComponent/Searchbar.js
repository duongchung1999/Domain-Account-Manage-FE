import React, { Component } from 'react';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    handleChange = (event) => {
        this.setState({ inputValue: event.target.value });
        this.props.handleSearchbarValue(event.target.value);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            this.props.handleSearchbarValue(this.state.inputValue);
            this.handleSearch();
        }
    }

    handleSearch = () => {
        // Perform search using this.state.inputValue
        console.log('Searching for:', this.state.inputValue);
        // Reset input value
        this.setState({ inputValue: '' });
    }
    
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
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <button 
                className="btn btn-warning" 
                id={this.props.btnID} 
                type="button"
                onClick={this.handleSearch}
                >
                    <i className="fas fa-search" />
                </button>
                </div>
            </form>
        );
    }
}

export default Searchbar;