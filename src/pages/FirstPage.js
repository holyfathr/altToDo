import Login from './Login/Login.jsx'
import SignIn from './SignIn/SignIn.jsx'
import {useState} from "react";
import './FirstPage.scss';
import BookIcon from '@mui/icons-material/Book';

function FirstPage() {
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
      <header className = "enterheader">
          <div className = "name">
            <p>ToDo</p>
            <BookIcon className='logo'/>
          </div>

          <ul role = "tablist">
            <li className = "nav-item">
              <button onClick = {handletab1}>
                Вход
              </button>
            </li>
            <li className = "nav-item">
              <button className='signIn' onClick = {handletab2}>
                Регистрация
              </button>
            </li>
          </ul>
      </header>
      {showtab1 && <Login/>}
      {showtab2 && <SignIn/>}
    </div>
  );
}

export default FirstPage;
