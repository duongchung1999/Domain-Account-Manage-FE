import logo from './logo.svg';
import './App.css';
import NavHeader from './header/NavHeader';
import MenuSide from './container/MenuSide';
import Searchbar from './publicComponent/Searchbar';
import React, { Component } from 'react';

function App(props) {
  return (
    <div className="sb-nav-fixed">
      <NavHeader/>
      <div className='UserContainer d-md-inline-block'>
        <div className='UserContainer-block'>
          <MenuSide/>
          <div className='table-container col' id='table-container'>
            <div className='table-container-header'>
              <h1 className='h1-table'>{props.h1Title}</h1>
             
              <CardBorder 
              title = {props.h4Title}
              container = {<p className="card-text">{props.pContent}</p>}>
              </CardBorder>
              
              {props.bodyTable}
              

              
            </div>
            
          </div>
        
        </div>
        

      </div>
      
    </div>
  );
}

export default App;

function CardBorder(props){
  return(
    <div>
      <div className="card border-primary">
        <div className="card-body">
          <h4 className="card-title">{props.title}</h4>
          {props.container}
        </div>
      </div>
      <br></br>
    </div>
      
  )
}
