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
import con_1 from "../../assets/con_1.png";
import con_2 from "../../assets/con_2.png";
import con_3 from "../../assets/con_3.png";
import F_1 from "../../assets/F_1.png";
import F_2 from "../../assets/F_2.png";
import F_3 from "../../assets/F_3.png";

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
  // ---------------------------------------------
  // 3 - Number Scroll
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    const counters = document.querySelectorAll(
      ".BottomInfo_Box_Part_2_Box span"
    );
    const container = document.querySelector(".BottomInfo_Box_Part_2_Box");

    const handleScroll = () => {
      if (
        window.pageYOffset >
          container.offsetTop - container.offsetHeight - 200 &&
        !activated
      ) {
        counters.forEach((counter) => {
          counter.innerText = 0;
          let count = 0;

          const updateCount = () => {
            const target = parseInt(counter.dataset.count);
            if (count < target) {
              count++;
              counter.innerText = count;
              setTimeout(updateCount, 10);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
          setActivated(true);
        });
      } else if (
        (window.pageYOffset <
          container.offsetTop - container.offsetHeight - 500 ||
          window.pageYOffset === 0) &&
        activated
      ) {
        counters.forEach((counter) => {
          counter.innerText = 0;
        });
        setActivated(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activated]);
  // Main Body
  return (
    <div className="My_Parent_About_C">
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
      {/* --- 2 - SecondContact --- */}
      <div className="Parent_SecondContact_Whole">
        <div className="SecondContact_Box">
          <h1>Taste the Difference with Us</h1>
          <p>
            Join us on a flavorful journey! Stay in the loop on our latest
            dishes, special promotions, and culinary events. Follow our social
            media to see what's cooking and connect with fellow food lovers.
            Let's make every meal a moment to remember !
          </p>
        </div>
      </div>
      {/* --- 3 - GetConnect --- */}
      <div className="Parent_GetConnect_Whole">
        <div className="Parent_GetConnect_Whole_Sub">
          {/* Box */}
          <div className="GetConnect_Box">
            {/* Part 1 */}
            <div className="GetConnect_Box_Part_1">
              <h1>
                Get <span>Connected</span>
              </h1>
              <p>
                If You Have Any Questions About Our Menu or Reservations, Please
                Don't Hesitate to Reach Out. We're Here to Serve You !
              </p>
            </div>
            {/* Part 2 */}
            <div className="GetConnect_Box_Part_2">
              {/* Main Box */}
              <div className="GetConnect_Box_Part_2_Box">
                <div className="GetConnect_Box_Part_2_Box_Part1">
                  <img src={con_3} alt="NA" />
                </div>
                <div className="GetConnect_Box_Part_2_Box_Part2">
                  <h1>Place Order</h1>
                  <p>Add To Cart To Order</p>
                </div>
              </div>
              {/* Main Box */}
              <div className="GetConnect_Box_Part_2_Box">
                <div className="GetConnect_Box_Part_2_Box_Part1">
                  <img src={con_2} alt="NA" />
                </div>
                <div className="GetConnect_Box_Part_2_Box_Part2">
                  <h1>Book Reservation</h1>
                  <p>Reserve Your Table Now</p>
                </div>
              </div>
              {/* Main Box */}
              <div className="GetConnect_Box_Part_2_Box">
                <div className="GetConnect_Box_Part_2_Box_Part1">
                  <img src={con_1} alt="NA" />
                </div>
                <div className="GetConnect_Box_Part_2_Box_Part2">
                  <h1>Access Portal</h1>
                  <p>Sign-In to Track Order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- 4 - BottomInfo --- */}
      <div className="Parent_BottomInfo_Whole">
        <div className="Parent_BottomInfo_Whole_Sub">
          {/* Box */}
          <div className="BottomInfo_Box">
            {/* Part */}
            <div className="BottomInfo_Box_Part_1">
              {/* Background Contact */}
            </div>
            {/* Part */}
            <div className="BottomInfo_Box_Part_2">
              {/* Sub Part */}
              <h3>Explore Our Plus-Point</h3>
              {/* Row */}
              <div className="BottomInfo_Box_Part_2_Box">
                {/* Small Box */}
                <div className="BottomInfo_Box_Part_2_Box_SmallBox">
                  <h1>
                    <span data-count="95">0</span> %
                  </h1>
                  <h2>Unmatched Taste</h2>
                </div>
                {/* Small Box */}
                <div className="BottomInfo_Box_Part_2_Box_SmallBox">
                  <h1>
                    <span data-count="85">0</span> +
                  </h1>
                  <h2>Signature Dishes</h2>
                </div>
              </div>
              {/* Row */}
              <div className="BottomInfo_Box_Part_2_Box">
                {/* Small Box */}
                <div className="BottomInfo_Box_Part_2_Box_SmallBox">
                  <h1>
                    <span data-count="100">0</span> %
                  </h1>
                  <h2>Freshness</h2>
                </div>
                {/* Small Box */}
                <div className="BottomInfo_Box_Part_2_Box_SmallBox">
                  <h1>
                    <span data-count="70">0</span> +
                  </h1>
                  <h2>Expert Chef</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4 - FinalContact --- */}
      <div className="Parent_FinalContact_Whole">
        {/* - Box - */}
        <div className="FinalContact_Box">
          {/* Part 1 */}
          <div className="FinalContact_Box_Part_1">
            <h1>Reach Out To Us</h1>
            <p>
              If You Have Any Queries Then Feel Free To Ask Us. We Are Here To
              Help You Out.
            </p>
          </div>
          {/* Part 2 */}
          <div className="FinalContact_Box_Part_2">
            {/* MiniBox Parent */}
            <div className="FinalContact_Box_Part_2_MiniBox_Whole">
              {/* MiniBox */}
              <div className="FinalContact_Box_Part_2_MiniBox">
                <div className="FinalContact_Box_Part_2_MiniBox_Part1">
                  <img src={F_1} alt="NA" />
                </div>
                <div className="FinalContact_Box_Part_2_MiniBox_Part2">
                  <h2>Call Us</h2>
                  <p>+92 51 4457171</p>
                </div>
              </div>
              {/* MiniBox */}
              <div className="FinalContact_Box_Part_2_MiniBox">
                <div className="FinalContact_Box_Part_2_MiniBox_Part1">
                  <img src={F_2} alt="NA" />
                </div>
                <div className="FinalContact_Box_Part_2_MiniBox_Part2">
                  <h2>Visit Us</h2>
                  <p>Maan O Salwa, Germany</p>
                </div>
              </div>
              {/* MiniBox */}
              <div className="FinalContact_Box_Part_2_MiniBox">
                <div className="FinalContact_Box_Part_2_MiniBox_Part1">
                  <img src={F_3} alt="NA" />
                </div>
                <div className="FinalContact_Box_Part_2_MiniBox_Part2">
                  <h2>Mail Us</h2>
                  <p>Maan_O_Salwa@gmail.com</p>
                </div>
              </div>
            </div>
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
