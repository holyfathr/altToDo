import Login from './pages/Login/Login.jsx'
import SignIn from './pages/SignIn/SignIn.jsx'
import {useState} from "react";
import './App.scss';


function App() {
  const [showtab1, setShowtab1] = useState(true);
  const [showtab2, setShowtab2] = useState(false);

  const handletab1 = () =>{
    setShowtab1(true)
    setShowtab2(false)
  }

  const handletab2 = () =>{
    setShowtab1(false)
    setShowtab2(true)
  }

  return (
    <div>
      <header class = "enterheader">
          <div class = "name">
            <img class = "logo" src='/img/logo.png' alt=""/>
            <p>AltToDo</p>
          </div>
          <ul role = "tablist">
            <li class = "nav-item">
              <button onClick = {handletab1}>
                Log In
              </button>
            </li>
            <li class = "nav-item">
              <button onClick = {handletab2}>
                Sign In
              </button>
            </li>
          </ul>
      </header>
      {showtab1 && <Login/>}
      {showtab2 && <SignIn/>}

    </div>
  );
}

export default App;
