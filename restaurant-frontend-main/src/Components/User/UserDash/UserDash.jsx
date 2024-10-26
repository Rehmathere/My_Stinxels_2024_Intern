import React from "react";
// CSS
import "./UserDash.scss";
// Images
import User_Dash from "../../../assets/User_Dash.png";

function UserDash() {
  // Get current date and time in the specified format
  const currentDateTime = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="min-h-[80vh] max-w-[100vw]">
      {/* - 0 - Heading - */}
      <h1 className="Branch_H">Dashboard</h1>
      {/* - 1 - Total UserDash Display - */}
      <div className="Parent_UserDash_Whole">
        <div className="Parent_UserDash_Whole_Sub">
          {/* - Box - */}
          <div className="UserDash_Box">
            {/* Row */}
            <div className="UserDash_Box_Part_1">
              <p>{currentDateTime}</p>
              <h1>Hello Rehmat Qazi !</h1>
              <h2>Deliciousness Is In Progress.</h2>
            </div>
            <div className="UserDash_Box_Part_2">
              <img src={User_Dash} alt="NA" />
            </div>
          </div>
        </div>
      </div>
      {/* - 2 - Points - */}
      <div className="Parent_UserPoint_Parent">
        <div className="Parent_UserPoint_Parent_Sub">
          <ul>
            <li>
              <i class="fa fa-shopping-basket"></i> Access and manage items
              recently added to your cart, with options to update or modify
              selections easily.
            </li>
            <li>
              <i class="fa fa-shopping-basket"></i> View your complete order
              history and track current orders in real-time for up-to-the-minute
              updates.
            </li>
            <li>
              <i class="fa fa-shopping-basket"></i> Make a reservation at any
              restaurant branch for a convenient and tailored dining experience.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserDash;
