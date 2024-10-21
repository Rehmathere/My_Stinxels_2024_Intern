import React, { useState, useEffect } from "react";
// Home CSS
import "./contact.scss";
// useNavigate
import { useNavigate } from "react-router-dom";
// Images
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import facebook from "../../assets/facebook.png";
import linkdin from "../../assets/linkdin.png";
import twitter from "../../assets/twitter.png";
import search from "../../assets/search.png";

function Contact() {
  // useNavigate Variable
  const navigate = useNavigate();
  // - Search Bar Logic -
  const [isVisible, setIsVisible] = useState(false); // To toggle visibility

  const handleSearchClick = () => {
    setIsVisible(!isVisible); // Toggle search bar visibility
  };

  // --- Responsive Input Search Btn ---
  const [isInputVisible, setIsInputVisible] = useState(false);
  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev);
  };
  // --- Responsive Input Search Btn ---
  // --- Responsive Input Box ---
  const [isInputVisible_1, setIsInputVisible_1] = useState(false);
  const toggleInputVisibility_1 = () => {
    setIsInputVisible_1((prev) => !prev);
  };
  // --- Responsive Input Search Btn ---

  // Main Body
  return (
    <div className="My_Parent_About">
      {/* --- 1 - Navbar + Background --- */}
      <div className="Parent_Navbar_Whole">
        <div className="Sub_Parent_Navbar_Whole">
          {/* - Navbar - */}
          <div className="Navbar_Main">
            {/* - Part 1 - */}
            <div className="Navbar_Main_Part_1">
              <img src={logo} alt="NA" />
            </div>
            {/* - Part 2 - */}
            <div className="Navbar_Main_Part_2">
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                {/* <li>Services</li> */}
                <li onClick={() => navigate("/about")}>About</li>
                <li id="Special_Li">Contact</li>
              </ul>
            </div>
            {/* - Part 3 - */}
            <div className="Navbar_Main_Part_3">
              {/* - Part 3 A - */}
              <div className="Navbar_Main_Part_3_A">
                <div
                  className="Navbar_Main_Part_3_A_Box"
                  onClick={handleSearchClick}
                >
                  <i className="fa fa-search"></i>
                </div>
              </div>
              <input
                type="search"
                placeholder=" Search Item here ... "
                className={isVisible ? "searchBar show" : "searchBar hide"}
              />
              {/* - Part 3 B - */}
              <div className="Navbar_Main_Part_3_B">
                {/* <button>JOIN</button> */}
                <a href="#" id="My_Btn" onClick={() => navigate("/login")}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  JOIN
                </a>
              </div>
              {/* Part 4 - ( Which Is Hide )*/}
              <div className="Navbar_Main_Part_4">
                <img src={menu} alt="NA" onClick={toggleInputVisibility_1} />
              </div>
            </div>
          </div>
          {/* Background Text */}
          <div className="Background_Txt_Parent">
            <h1>Contact Us</h1>
            <p>Feel Free To Contact Us</p>
          </div>
        </div>
      </div>

      {/* -------------- */}
      {/* - Write Here - */}
      {/* -------------- */}
      {/* --- 4 - Footer --- */}
      <div className="Parent_Footer_Whole">
        <div className="Parent_Footer_Whole_Sub">
          <div className="Footer_Box">
            <div className="Footer_Box_Part_1">
              <div className="Footer_Box_Part_1_A">
                <img src={logo} alt="NA" />
              </div>
              <div className="Footer_Box_Part_1_B">
                <ul>
                  <li onClick={() => navigate("/")}>Home</li>
                  {/* <li>Services</li> */}
                  <li onClick={() => navigate("/about")}>About</li>
                  <li onClick={() => navigate("/contact")}>Contact</li>
                </ul>
              </div>
              <div className="Footer_Box_Part_1_C">
                <p>
                  Maan-O-Salva combines national culinary traditions with
                  European technology, offering fresh, high-quality dishes.
                </p>
              </div>
            </div>
            <div className="Footer_Box_Part_2">
              {/* - Icon Box - */}
              <div className="Footer_Box_Icon">
                <img src={facebook} alt="NA" />
              </div>
              {/* - Icon Box - */}
              <div className="Footer_Box_Icon">
                <img src={linkdin} alt="NA" />
              </div>
              {/* - Icon Box - */}
              <div className="Footer_Box_Icon">
                <img src={twitter} alt="NA" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- 7 - Responsive Navbar --- */}
      {isInputVisible_1 && (
        <div className="Parent_ResNav_Whole">
          <div className="Parent_ResNav_Whole_Sub">
            <div className="ResNav_Box">
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/about")}>About</li>
                <li id="MyActive">Contact Us</li>
              </ul>
              <img src={search} alt="NA" onClick={toggleInputVisibility} />
              {isInputVisible && (
                <input type="search" placeholder="Search Item here ..." />
              )}
              <a href="#" id="My_Btn" onClick={() => navigate("/login")}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                JOIN
              </a>
            </div>
          </div>
        </div>
      )}
      {/* - */}
    </div>
  );
}

export default Contact;
