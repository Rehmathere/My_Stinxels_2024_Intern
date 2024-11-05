import React from "react";
import MenuItems from "../MenuItems/MenuItems";
import "../../Home/home.scss";
function Menu() {
  return (
    <>
      <div className="Parent_Menu_Whole min-h-[100vh]">
        <div className="Parent_Menu_Whole_Sub">
          <MenuItems />
        </div>
      </div>
    </>
  );
}

export default Menu;
