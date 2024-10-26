import React from "react";
// CSS
import "./Homedash.scss";
// Images
import Pic_1 from "../../../assets/food_o.png";
import Pic_2 from "../../../assets/order_o.png";
import Pic_3 from "../../../assets/revenue_o.png";
import Pic_4 from "../../../assets/customer_o.png";

function HomeDash() {
  return (
    <div className="min-h-[80vh] max-w-[100vw]">
      {/* - 0 - Heading - */}
      <h1 className="Branch_H">Admin Dashboard</h1>
      {/* - 1 - Total HomeDash Display - */}
      <div className="Parent_HomeDash_Whole">
        <div className="Parent_HomeDash_Whole_Sub">
          {/* Whole Box */}
          <div className="HomeDash_Box">
            {/* Row */}
            <div className="HomeDash_Box_Row">
              {/* - Box - */}
              <div className="HomeDash_Box_Main">
                <div className="HomeDash_Box_Main_Part_1">
                  <p>459</p>
                  <h1>Total Menus</h1>
                </div>
                <div className="HomeDash_Box_Main_Part_2">
                  <img src={Pic_1} alt="NA" />
                </div>
              </div>
              {/* - Box - */}
              <div className="HomeDash_Box_Main">
                <div className="HomeDash_Box_Main_Part_1">
                  <p>159</p>
                  <h1>Total Orders</h1>
                </div>
                <div className="HomeDash_Box_Main_Part_2">
                  <img src={Pic_2} alt="NA" />
                </div>
              </div>
            </div>
            {/* Row */}
            <div className="HomeDash_Box_Row">
              {/* - Box - */}
              <div className="HomeDash_Box_Main">
                <div className="HomeDash_Box_Main_Part_1">
                  <p>$ 1,500</p>
                  <h1>Total Revenue</h1>
                </div>
                <div className="HomeDash_Box_Main_Part_2">
                  <img src={Pic_3} alt="NA" />
                </div>
              </div>
              {/* - Box - */}
              <div className="HomeDash_Box_Main">
                <div className="HomeDash_Box_Main_Part_1">
                  <p>76</p>
                  <h1>Total Customers</h1>
                </div>
                <div className="HomeDash_Box_Main_Part_2">
                  <img src={Pic_4} alt="NA" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDash;
