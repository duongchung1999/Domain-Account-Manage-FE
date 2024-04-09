import logo from './logo.svg';
import './App.css';
import NavHeader from './header/NavHeader';
import MenuSide from './container/MenuSide';

function App() {
  return (
    <div className="sb-nav-fixed">
      <NavHeader/>
      <div className='layoutContainer'>
        <MenuSide/>

      </div>
      
    </div>
  );
}

export default App;
