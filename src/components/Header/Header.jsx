import React from "react";
import BookIcon from '@mui/icons-material/Book';
import "./Header.scss"
import { NavLink } from "react-router-dom";

const Header = () =>{
    return(
        <header class = "enterheader">
          <div class = "name">
            <p>ToDo</p>
            <BookIcon className='logo'/>
          </div>

          <ul role = "tablist">
            <li class = "nav-item">
              <NavLink to="/login">
                <button>
                    Выход
                </button>
              </NavLink>
            </li>
          </ul>
      </header>
    )
}

export default Header