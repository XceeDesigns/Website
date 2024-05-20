import { useState } from "react";
import logo from '../assets/Images/logo-new.png'


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
                    <span
                      aria-hidden="true"
                      className="icon_menu hamb-mob-icon"
                    ></span>
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

        <div id="index-link" className="relative">
          <div
            className="rev_slider_wrapper fullscreen-container"
            id="rev_slider_280_1_wrapper"
            style={{ backgroundColor: "#fff", padding: "0px" }}
          >
            <div
              className="rev_slider fullscreenbanner"
              data-version="5.1.4"
              id="rev_slider_280_1"
              style={{ display: "none" }}
            >
              <ul>
                <li
                  data-description=""
                  data-easein="Power2.easeInOut"
                  data-easeout="default"
                  data-index="rs-898"
                  data-masterspeed="1500"
                  data-param1=""
                  data-param10=""
                  data-param2=""
                  data-param3=""
                  data-param4=""
                  data-param5=""
                  data-param6=""
                  data-param7=""
                  data-param8=""
                  data-param9=""
                  data-rotate="0"
                  data-saveperformance="off"
                  data-slotamount="default"
                  data-title="Slide"
                  data-transition="fade"
                >
                  <img
                    alt="img"
                    className="rev-slidebg"
                    data-bgparallax="12"
                    data-bgposition="top center"
                    data-duration="30000"
                    data-ease="Linear.easeNone"
                    data-no-retina=""
                    src="images/revo-slider/index-portfolio2.jpg"
                  />

                  <div
                    className="tp-caption font-lato font-white tp-resizeme"
                    id="slide-898-layer-1"
                    style={{
                      zIndex: 8,
                      whiteSpace: "nowrap",
                      letterSpacing: "10px",
                    }}
                    data-fontsize='["77","77","52","49"]'
                    data-fontweight="300"
                    data-height="none"
                    data-lineheight='["85","85","85","85"]'
                    data-responsive_offset="on"
                    data-splitin="none"
                    data-splitout="none"
                    data-frames='[{"from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:.95;","delay":500,"ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"to":"y:[100%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"nothing"}]'
                    data-whitespace="nowrap"
                    data-width="none"
                    data-x='["center","center","center","center"]'
                    data-hoffset='["0","0","0","0"]'
                    data-y='["center","center","center","center"]'
                    data-voffset='["-105","-105","-90","-85"]'
                  >
                    IMAGINATION
                  </div>

                  <div
                    className="tp-caption font-lato font-white tp-resizeme"
                    id="slide-898-layer-2"
                    style={{
                      zIndex: 8,
                      whiteSpace: "nowrap",
                      letterSpacing: "10px",
                    }}
                    data-fontsize='["67","67","45","42"]'
                    data-fontweight="300"
                    data-height="none"
                    data-lineheight='["80","80","80","80"]'
                    data-responsive_offset="on"
                    data-splitin="none"
                    data-splitout="none"
                    data-frames='[{"from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:.95;","delay":900,"ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"to":"y:[100%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"nothing"}]'
                    data-whitespace="nowrap"
                    data-width="none"
                    data-x='["center","center","center","center"]'
                    data-hoffset='["0","0","0","0"]'
                    data-y='["center","center","center","center"]'
                    data-voffset='["-20","-20","-20","-20"]'
                  >
                    WILL TAKE YOU
                  </div>

                  <div
                    className="tp-caption font-lato font-white tp-resizeme"
                    id="slide-898-layer-3"
                    style={{
                      zIndex: 8,
                      whiteSpace: "nowrap",
                      letterSpacing: "10px",
                    }}
                    data-fontsize='["78","78","52","50"]'
                    data-fontweight="600"
                    data-height="none"
                    data-lineheight='["90","90","90","90"]'
                    data-responsive_offset="on"
                    data-splitin="none"
                    data-splitout="none"
                    data-frames='[{"from":"y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","speed":1500,"to":"o:.95;","delay":1300,"ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"to":"y:[100%];","mask":"x:inherit;y:inherit;s:inherit;e:inherit;","ease":"nothing"}]'
                    data-whitespace="nowrap"
                    data-width="none"
                    data-x='["center","center","center","center"]'
                    data-hoffset='["0","0","0","0"]'
                    data-y='["center","center","center","center"]'
                    data-voffset='["70","70","55","50"]'
                  >
                    EVERYWHERE
                  </div>
                </li>
              </ul>
              <div
                className="tp-bannertimer tp-bottom"
                style={{ visibility: "hidden !important" }}
              ></div>
            </div>
          </div>
          <div className="local-scroll-cont font-white">
            <a href="#about" className="scroll-down smooth-scroll">
              <div className="icon icon-arrows-down"></div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;