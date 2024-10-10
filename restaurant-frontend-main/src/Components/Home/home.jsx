import React from "react";
// Home CSS
import "./home.scss";
// Images
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import sec_1 from "../../assets/second_1.png";
import sec_2 from "../../assets/second_2.png";
import Chicken_1 from "../../assets/Menu_Pics/Chicken1.jpg";
import Chicken_2 from "../../assets/Menu_Pics/Chicken2.jpg";
import Chicken_3 from "../../assets/Menu_Pics/Chicken3.jpg";
import Burger_1 from "../../assets/Menu_Pics/burger1.jpg";
import Burger_2 from "../../assets/Menu_Pics/burger2.jpg";
import Burger_3 from "../../assets/Menu_Pics/burger3.jpg";
import Salad_1 from "../../assets/Menu_Pics/Salad1.jpg";
import Salad_2 from "../../assets/Menu_Pics/Salad2.jpg";
import Salad_3 from "../../assets/Menu_Pics/Salad3.jpg";
import Drink_1 from "../../assets/Menu_Pics/drink1.jpg";
import Drink_2 from "../../assets/Menu_Pics/drink2.jpg";
import Drink_3 from "../../assets/Menu_Pics/drink3.jpg";
import Sauce_1 from "../../assets/Menu_Pics/sauce1.jpg";
import Sauce_2 from "../../assets/Menu_Pics/sauce2.jpg";
import Sauce_3 from "../../assets/Menu_Pics/sauce3.jpg";

function Home() {
  // Chicken API Item 
  const chickenData = [
    {
      id: 1,
      name: "Wings, 17 pcs",
      description: "Crispy Chicken Wings, 17 pcs",
      price: 1000,
      image: Chicken_1,
    },
    {
      id: 2,
      name: "Strips, 3 pcs",
      description: "Tender Chicken Fillet, 3 pcs",
      price: 300,
      image: Chicken_2,
    },
    {
      id: 3,
      name: "Chicken Corn",
      description: "Tender Chicken Pieces",
      price: 450,
      image: Chicken_3,
    },
  ];
  // Burger API Item 
  const burgerData = [
    {
      id: 1,
      name: "Crunch Bruger",
      description: "Soft , Juicy Chicken",
      price: 350,
      image: Burger_1,
    },
    {
      id: 2,
      name: "Jalapeno Burger",
      description: "With Tender Chicken Fillet",
      price: 750,
      image: Burger_2,
    },
    {
      id: 3,
      name: "Biger",
      description: "Smoked Beef, Cheddar",
      price: 800,
      image: Burger_3,
    },
  ];
  // Salad API Item 
  const saladData = [
    {
      id: 1,
      name: "Les Berbecue",
      description: "BBQ Chicken Filet",
      price: 200,
      image: Salad_1,
    },
    {
      id: 2,
      name: "Coleslaw",
      description: "White Cabbage, Carrots",
      price: 350,
      image: Salad_2,
    },
    {
      id: 3,
      name: "Caesar",
      description: "Chicken Fillet, Cheese",
      price: 550,
      image: Salad_3,
    },
  ];
  // Drink API Item 
  const drinkData = [
    {
      id: 1,
      name: "New Moxito",
      description: "New, Bright Taste",
      price: 180,
      image: Drink_1,
    },
    {
      id: 2,
      name: "Ice Coffee",
      description: "Pure Black Coffee",
      price: 200,
      image: Drink_2,
    },
    {
      id: 3,
      name: "Coca-Cola",
      description: "1.5 Ltr",
      price: 140,
      image: Drink_3,
    },
  ];
  // Sauce API Item 
  const sauceData = [
    {
      id: 1,
      name: "Ketchup",
      description: "1 Item",
      price: 50,
      image: Sauce_1,
    },
    {
      id: 2,
      name: "Cheesy",
      description: "1 Item",
      price: 50,
      image: Sauce_2,
    },
    {
      id: 3,
      name: "Mayonnaise",
      description: "1 Item",
      price: 50,
      image: Sauce_3,
    },
  ];

  // Main Body
  return (
    <div className="My_Parent">
      {/* 1 - Navbar + Background */}
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
                <li id="Special_Li">Home</li>
                <li>Services</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            {/* - Part 3 - */}
            <div className="Navbar_Main_Part_3">
              {/* - Part 3 A - */}
              <div className="Navbar_Main_Part_3_A">
                <div className="Navbar_Main_Part_3_A_Box">
                  <i className="fa fa-search"></i>
                </div>
              </div>
              {/* - Part 3 B - */}
              <div className="Navbar_Main_Part_3_B">
                {/* <button>JOIN</button> */}
                <a href="#" id="My_Btn">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  JOIN
                </a>
              </div>
              {/* Part 4 - ( Which Is Hide )*/}
              <div className="Navbar_Main_Part_4">
                <img src={menu} alt="NA" />
              </div>
            </div>
          </div>
          {/* Background Text */}
          <div className="Background_Txt_Parent">
            <h1>Cravings, Delivered Hot</h1>
            <p>
              Experience flavors that spark joy in every bite. Let us deliver
              fresh, straight to your doorstep, whenever hunger calls.
            </p>
          </div>
        </div>
      </div>
      {/* 2 - Opens + Rating */}
      <div className="Parent_Opens_Whole">
        <div className="Parent_Opens_Whole_Sub">
          {/* Box */}
          <div className="Box_Open_Main">
            <div className="Box_Open_Main_Part_1">
              <img src={sec_2} alt="NA" />
            </div>
            <div className="Box_Open_Main_Part_2">Rating 9.9</div>
          </div>
          {/* Box */}
          <div className="Box_Open_Main">
            <div className="Box_Open_Main_Part_1">
              <img src={sec_1} alt="NA" />
            </div>
            <div className="Box_Open_Main_Part_2">Opens Till 12.00</div>
          </div>
        </div>
      </div>
      {/* 3 - Menu */}
      <div className="Parent_Menu_Whole">
        <div className="Parent_Menu_Whole_Sub">
          {/* Box */}
          <div className="Menu_Box">
            <h1>Chicken</h1>
            <div className="Menu_Box_Sub">
              {/* Item */}
              {chickenData &&
                chickenData.map((item) => (
                  <div key={item.id} className="Menu_Item_Box">
                    <div className="Menu_Item_Box_Sub">
                      <div className="Menu_Item_Box_Sub_Part1">
                        <p className="Menu_Item_P1">{item.name}</p>
                        <span>{item.description}</span>
                        <p className="Menu_Item_P2">PKR {item.price}</p>
                      </div>
                      <div className="Menu_Item_Box_Sub_Part2">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <button>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Box */}
          <br />
          <div className="Menu_Box">
            <h1>Burger</h1>
            <div className="Menu_Box_Sub">
              {/* Item */}
              {burgerData &&
                burgerData.map((item) => (
                  <div key={item.id} className="Menu_Item_Box">
                    <div className="Menu_Item_Box_Sub">
                      <div className="Menu_Item_Box_Sub_Part1">
                        <p className="Menu_Item_P1">{item.name}</p>
                        <span>{item.description}</span>
                        <p className="Menu_Item_P2">PKR {item.price}</p>
                      </div>
                      <div className="Menu_Item_Box_Sub_Part2">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <button>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Box */}
          <br />
          <div className="Menu_Box">
            <h1>Salads</h1>
            <div className="Menu_Box_Sub">
              {/* Item */}
              {saladData &&
                saladData.map((item) => (
                  <div key={item.id} className="Menu_Item_Box">
                    <div className="Menu_Item_Box_Sub">
                      <div className="Menu_Item_Box_Sub_Part1">
                        <p className="Menu_Item_P1">{item.name}</p>
                        <span>{item.description}</span>
                        <p className="Menu_Item_P2">PKR {item.price}</p>
                      </div>
                      <div className="Menu_Item_Box_Sub_Part2">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <button>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Box */}
          <br />
          <div className="Menu_Box">
            <h1>Drinks</h1>
            <div className="Menu_Box_Sub">
              {/* Item */}
              {drinkData &&
                drinkData.map((item) => (
                  <div key={item.id} className="Menu_Item_Box">
                    <div className="Menu_Item_Box_Sub">
                      <div className="Menu_Item_Box_Sub_Part1">
                        <p className="Menu_Item_P1">{item.name}</p>
                        <span>{item.description}</span>
                        <p className="Menu_Item_P2">PKR {item.price}</p>
                      </div>
                      <div className="Menu_Item_Box_Sub_Part2">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <button>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Box */}
          <br />
          <div className="Menu_Box">
            <h1>Sauces</h1>
            <div className="Menu_Box_Sub">
              {/* Item */}
              {sauceData &&
                sauceData.map((item) => (
                  <div key={item.id} className="Menu_Item_Box">
                    <div className="Menu_Item_Box_Sub">
                      <div className="Menu_Item_Box_Sub_Part1">
                        <p className="Menu_Item_P1">{item.name}</p>
                        <span>{item.description}</span>
                        <p className="Menu_Item_P2">PKR {item.price}</p>
                      </div>
                      <div className="Menu_Item_Box_Sub_Part2">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <button>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
