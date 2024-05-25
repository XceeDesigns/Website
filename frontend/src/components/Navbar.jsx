import { useState } from "react";
import logo from '../assets/Images/logo-new.png'
import { IoMenu } from "react-icons/io5";
import '../Navbar.css/bootstrap.min.css'
import '../Navbar.css/icons-fonts.css'
import '../Navbar.css/style.css'


function Navbar() {
  const [Input , setInput] = useState("") ; 

  return (
    <>
      <div className="header-transporent-bg-black">
        <header
          id="nav"
          className="header header-1 header-black-white affix-on-mobile"
        >
          <div className="header-wrapper">
            <div className="container-m-30 clearfix">
              <div className="logo-row">
                <div className="logo-container-2">
                  <div className="logo-2">
                    <a href="contact-dashboard.html" className="clearfix">
                      <img
                        src={logo}
                        className="logo-img logo-color-change"
                        alt="Logo"
                      />
                    </a>
                  </div>
                </div>
                <div className="menu-btn-respons-container">
                  <button
                    type="button"
                    className="navbar-toggle btn-navbar collapsed"
                    data-toggle="collapse"
                    data-target="#main-menu .navbar-collapse"
                  >
                     <IoMenu
                  style={{
                    fontSize : '1.9em' , 
                    marginRight : '10px',
                    marginTop : '22px', 
                  }}
                />
                  </button>
                </div>
              </div>
            </div>

            <div className="main-menu-container">
              <div className="container-m-30 clearfix">
                <div id="main-menu">
                  <div className="navbar navbar-default" role="navigation">
                    <nav className="collapse collapsing navbar-collapse right-1024">
                      <ul className="nav navbar-nav">
                        <li className="parent">
                          <a href="index.html">
                            <div className="main-menu-title">HOME</div>
                          </a>
                        </li>

                        <li className="parent">
                          <a href="services.html">
                            <div className="main-menu-title">SERVICES</div>
                          </a>
                        </li>

                        <li
                          id="menu-contact-info-big"
                          className="parent megamenu"
                        >
                          <a href="contact.html">
                            <div className="main-menu-title">CONTACT</div>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <ul className="cd-header-buttons">
              <li>
                <a className="cd-search-trigger" href="#cd-search">
                  <span></span>
                </a>
              </li>
            </ul>
            <div id="cd-search" className="cd-search">
              <form className="form-search" id="searchForm">
                <input
                  type="text"
                  name="q"
                  id="q"
                  placeholder="Search..."
                  value={Input} 
                  onChange={(e) => setInput(Number(e.target.value))} 
                />
              </form>
            </div>
          </div>
        </header>
        
      </div>
    </>
  );
}

export default Navbar;