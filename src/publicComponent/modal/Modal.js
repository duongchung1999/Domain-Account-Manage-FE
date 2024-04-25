import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div className="modal js-modal">
              <div className="container js-modal-container">
                <div className="modal-close js-modal-close">
                  <i className="ti-close" />
                </div>
                <header className="modal-header">
                  <i className="header-bag ti-bag" />
                  Tickets
                </header>
                <div className="modal-body">
                  <label htmlFor="ticket-quantity" className="modal-label">
                    <i className="ti-shopping-cart" />
                    Tickets, $15 per person
                  </label>
                  <input
                    id="ticket-quantity"
                    type="text"
                    className="modal-input"
                    placeholder="How many?"
                  />
                  <label htmlFor="ticket-email" className="modal-label">
                    <i className="ti-user" />
                    Send To
                  </label>
                  <input
                    id="ticket-email"
                    type="text"
                    className="modal-input"
                    placeholder="Enter email....."
                  />
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