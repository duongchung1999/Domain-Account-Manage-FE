import logo from './logo.svg';
import './App.css';
import NavHeader from './header/NavHeader';
import MenuSide from './container/MenuSide';
import Searchbar from './publicComponent/Searchbar';
import React, { Component } from 'react';
import CardBorder from './publicComponent/CardBorder';

class App extends Component  {
  constructor(props) {
      super(props);
      this.state = {
          isMenuSideVisible: true
      };
  }

  toggleMenuSideVisibility = () => {
      this.setState(prevState => ({
          isMenuSideVisible: !prevState.isMenuSideVisible
      }));
  }

  render (){
    return (
      <div className="sb-nav-fixed">
        <NavHeader toggleMenuSide={this.toggleMenuSideVisibility}/>
        <div className='UserContainer d-md-inline-block'>
          <div className='UserContainer-block'>
            {this.state.isMenuSideVisible && <MenuSide />}
            <div className='table-container col' id='table-container'>
              <div className='table-container-header'>
                <h1 className='h1-table'>{this.props.h1Title}</h1>
              
                <CardBorder 
                title = {this.props.h4Title}
                container = {<p className="card-text">{this.props.pContent}</p>}>
                </CardBorder>
                
                {this.props.bodyTable}
                

                
              </div>
              
            </div>
          
          </div>
          

        </div>
        
      </div>
    );
  }  
}

export default App;


