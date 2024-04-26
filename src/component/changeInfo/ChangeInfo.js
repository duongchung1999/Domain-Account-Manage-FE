import React, { Component } from 'react';
import App from '../../App';
import Modal from '../../publicComponent/modal/Modal';
class ChangeInfo extends Component {
    render() {
        return (
            <Modal 
            columns={this.props.columns}
            title={this.props.changeTitle}
            showModal={showModal}
            toggleModal={this.toggleModal}
            defaultValue={rowData}
            // defaultValue={rowData ? rowData[this.props.columns[0].accessor] : null}
            />
        );
    }
}

export default ChangeInfo;