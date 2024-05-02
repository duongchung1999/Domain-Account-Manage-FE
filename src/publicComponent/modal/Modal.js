import React, { Component } from 'react';
import './modal.css';
import context from 'react-bootstrap/esm/AccordionContext';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
class Modal extends Component {
  constructor(props) {
      super(props);
      this.state = {
          formData: {} ,
          isModalOpen: false 
      };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.showModal && this.props.showModal) {
      this.setState({ isModalOpen: true,
         });
    }
   
  } 
  

  handleFormItemChange = (accessor, value) => {
      this.setState(prevState => ({
          formData: {
              ...prevState.formData,
              [accessor]: value 
          }
      }));
     
  };
  handleCloseModal = () => {
    this.setState({ isModalOpen: false ,
      }); 
    this.props.toggleModal(); 
  };



  // Add Item:
  handleAddItem = async () => {
    const { formData } = this.state;
    const requestBody = {};
    const token = localStorage.getItem('token');
    
    Object.keys(formData).forEach(key => {
      requestBody[key] = formData[key];
    });
    try {
      const response = await fetch('http://10.53.160.160:5080/api/Computer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      // console.log(responseData);

      if (response.status === 201) {
        alert("Add Success!");
        this.handleCloseModal();
      } else {
        // Xử lý trường hợp khác (nếu cần)
      }
  
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  deleteItem = async () => {
    const { formData } = this.state;
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://10.53.160.160:5080/api/Computer/${this.props.defaultValue["id"]}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        }
      });
  
      if (response.status === 204) {
        alert("DELETE Success!");
        this.handleCloseModal();
      } else {
        // Xử lý trường hợp không thành công ở đây
      }
  
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
    render() {
      const { columns, showModal, toggleModal } = this.props;
      const { formData,isModalOpen  } = this.state;
        return (
            <div className={`modal js-modal ${showModal || isModalOpen ? '' : 'hidden'}`}>
              <div className="container1 js-modal-container">
                <div className="modal-close js-modal-close" 
                  onClick={this.handleCloseModal}>
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <header className="modal-header">
                  <i className="header-bag ti-bag" />
                  {this.props.title}
                </header>
                <div className="modal-body">
                  <div className='row'>
                    <div className='col-7'>
                        {columns.map(column => (
                          column.Header !== 'No' && 
                          <ItemChange 
                          defaultValue={this.props.defaultValue} 
                          itemName={column.Header} 
                          itemAccesor={column.accessor}
                          isModalOpen={isModalOpen}
                          onFormItemChange={this.handleFormItemChange}
                          />
                        ))}
                    </div>
                    <div className='col-5'>
                      <div className="card border-primary ">
                        <div className="card-body">
                          <h4 className="card-title">New {this.props.title} </h4>
                          {columns.map(column => (
                          column.Header !== 'No' && 
                          <ViewItem key={column.accessor}
                          itemName={column.accessor}
                          itemValue={formData[column.accessor]} 
                          defaultValue={this.props.defaultValue} />
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="modal-footer">
                  <p className="modal-help">
                  <Button 
                  variant="info" 
                  style={{ marginLeft: '10px' }}
                  onClick={this.handleAddItem}
                  >Add</Button>

                  <Button 
                  variant="warning" 
                  style={{ marginLeft: '10px' }}
                  
                  >Update</Button>

                  <Button 
                  variant="danger" 
                  style={{ marginLeft: '10px' }}
                  onClick={this.deleteItem}
                  >Remove</Button>

                  </p>
                </footer>
              </div>
            </div>
        );
    }
}

export default Modal;

class ItemChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: (this.props.defaultValue && this.props.defaultValue[this.props.itemAccesor]) || ''
    };
  }
  

  componentDidUpdate(prevProps) {
    if (prevProps.isModalOpen !== this.props.isModalOpen) {
      const defaultValue = this.props.defaultValue || {}; // Kiểm tra xem this.props.defaultValue có tồn tại không
      // console.log(defaultValue);
      this.setState({
        inputValue: defaultValue[this.props.itemAccesor] || ''
        
      });
      const { itemAccesor,onFormItemChange } = this.props;
      try{
        onFormItemChange(itemAccesor, this.state.inputValue||this.props.defaultValue[itemAccesor]);
      }
      catch{
        onFormItemChange(itemAccesor, "");
      }
     
    }
  }
  
  handleInputChange = event => {
      const { itemAccesor, onFormItemChange } = this.props;
      const value = event.target.value;
      this.setState({ inputValue: value });
      // Gọi hàm để cập nhật state của Modal
      onFormItemChange(itemAccesor, value);
  };

  render() {
    const { defaultValue, itemAccesor } = this.props;
    const itemValue = defaultValue && defaultValue[itemAccesor]; 
    return (
      <div>
        <div className='row item-change'>
          <label htmlFor="ticket-quantity" className="modal-label col-2">
            <i className="ti-shopping-cart" />
            {this.props.itemName}
          </label>
          <input
            id="ticket-quantity"
            type="text"
            className="modal-input col-10"
            placeholder={"  Type New " + this.props.itemName + " in here..."}
            defaultValue={itemValue }   
            // defaultValue={this.state.inputValue }   
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </div>
        <br />
      </div>
    );
  }
}

class ViewItem extends Component{
  render(){
    const { defaultValue, itemName } = this.props;
    const itemValue = defaultValue && defaultValue[itemName]; 
    return(
      <div>
        <div className='row'>
          <div className='col-5 no-padding'>{this.props.itemName}:</div>
          <div className='col-7 no-padding'>{this.props.itemValue?this.props.itemValue:itemValue}</div>
        </div>
         
      </div>
    );
  }
}