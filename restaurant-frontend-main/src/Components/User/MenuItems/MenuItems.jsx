import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";
import { addToCart } from "../../../Redux/Slices/UserSlice";

import "../../Home/home";

function MenuItems() {
  // Chicken API Item
  const dispatch = useDispatch();
  const { Fries, Burger, Chicken, Salads, Drinks, Sauces } = useSelector(
    (state) => state.menuSlice.menu
  );

  useEffect(() => {
    dispatch(getMenuThunk());
  }, []);
  return (
    <>
      {Chicken.length != 0 && (
        <MenuItem categoryText={"Chicken"} ItemArray={Chicken} />
      )}
      {Burger.length != 0 && (
        <MenuItem categoryText={"Burger"} ItemArray={Burger} />
      )}

      {Fries.length != 0 && (
        <MenuItem categoryText={"Fries"} ItemArray={Fries} />
      )}

      {Salads.length != 0 && (
        <MenuItem categoryText={"Salads"} ItemArray={Salads} />
      )}
      {Drinks.length != 0 && (
        <MenuItem categoryText={"Drinks"} ItemArray={Drinks} />
      )}
      {Sauces.length != 0 && (
        <MenuItem categoryText={"Sauces"} ItemArray={Sauces} />
      )}
    </>
  );
}

function MenuItem({ categoryText, ItemArray }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.userSlice.cart);
  console.log(cart);

  const addItem = (body) => {
    const { category, _id } = body;
    // console.log({ category, _id });

    dispatch(addToCart({ category, _id }));
  };
  return (
    <>
      <div className="Menu_Box">
        <h1>{categoryText}</h1>
        <div className="Menu_Box_Sub">
          {/* Item */}
          {ItemArray?.map((item) => (
            <div key={item.id} className="Menu_Item_Box">
              <div className="Menu_Item_Box_Sub">
                <div className="Menu_Item_Box_Sub_Part1">
                  <p className="Menu_Item_P1">{item.name}</p>
                  <span>{item.description}</span>
                  <p className="Menu_Item_P2">PKR {item.price}</p>
                </div>
                <div className="Menu_Item_Box_Sub_Part2">
                  <img src={item.img} alt={item.name} />
                </div>
                <button onClick={() => addItem(item)}>
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuItems;
