import logo from './logo.svg';
import './App.css';
import NavHeader from './header/NavHeader';
import MenuSide from './container/MenuSide';
import MyTableComponent from './container/userTable/UserTable';

function App() {
  return (
    <div className="sb-nav-fixed">
      <NavHeader/>
      <div className='UserContainer'>
        <div className='row'>
          <MenuSide/>
          <div className='table-container col' id='table-container'>
            <div className='table-container-header'>
              <h1 className='h1-table'>User Information</h1>
             
              <CardBorder 
              title = "This Table show all Users account information of Foxlink - DN1"
              container = {<p className="card-text">You can find any user of Foxlink - DN1</p>}>
              </CardBorder>
              <CardBorder
              //  title = "This Table show all Users account information of Foxlink - DN1" 
               title={<><i className="fa-solid fa-table"></i> Users Table</>}
               container = {<MyTableComponent/>}>
               </CardBorder>

              
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
