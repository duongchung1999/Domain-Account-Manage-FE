import React, { Component } from 'react';
import './modal.css';
import context from 'react-bootstrap/esm/AccordionContext';
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
      this.setState({ isModalOpen: true });
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
    this.setState({ isModalOpen: false }); 
    this.props.toggleModal(); 
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
                      onFormItemChange={this.handleFormItemChange}/>
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
                
                  
                  
                  
                  <button className="buy-tickets">
                    PAY <i className="ti-check" />
                  </button>
                </div>
                <footer className="modal-footer">
                  <p className="modal-help">
                    Need <a href="">help?</a>
                  </p>
                </footer>
              </div>
            </div>
        );
    }
}

export default Modal;

class ItemChange extends Component {
  handleInputChange = event => {
      const { itemAccesor, onFormItemChange } = this.props;
      const value = event.target.value;
      
      // Gọi hàm để cập nhật state của Modal
      onFormItemChange(itemAccesor, value);
  };

  render() {
    const { defaultValue, itemAccesor } = this.props;
    const itemValue = defaultValue && defaultValue[itemAccesor]; 
    // console.log(itemValue);
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
        {this.props.itemName}: {this.props.itemValue?this.props.itemValue:itemValue}
      </div>
    );
  }
}