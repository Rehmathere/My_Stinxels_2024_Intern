import React, { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrementQty } from "../../../Redux/Slices/UserSlice";
function CartDrawer({ open, setOpen }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userSlice.cart);

  const addItem = (body) => {
    dispatch(addToCart(body));
  };

  const decreaseQty = (body) => {
    dispatch(decrementQty(body));
  };

  const Footer = () => {
    return (
      <>
        <Button>Place Order</Button>
        {cart.length != 0 && (
          <span>
            {cart.reduce(
              (accumulator, { total }) => accumulator + parseInt(total),
              0
            )}
          </span>
        )}
      </>
    );
  };

  return (
    <>
      <Drawer
        title="My Order"
        onClose={() => setOpen(false)}
        open={open}
        footer={<Footer />}
      >
        {cart?.map((item) => (
          <>
            <div className="Menu_Item_Box">
              <div className="Menu_Item_Box_Sub">
                <div className="Menu_Item_Box_Sub_Part1">
                  <p className="Menu_Item_P1">{item.name}</p>
                  <span>{item.description}</span>
                  <p className="Menu_Item_P2">PKR {item.priceprice}</p>
                </div>
                <div className="Menu_Item_Box_Sub_Part2">
                  {/* <img src={img} alt={name} /> */}
                </div>
                <div>Price {item.price}</div>
                <div>Qty {item.qty}</div>
                <div>Total Price {item.total}</div>
                <Button onClick={() => addItem(item)}>+</Button>

                <Button onClick={() => decreaseQty(item)}>-</Button>
              </div>
            </div>
            <br />
          </>
        ))}
      </Drawer>
    </>
  );
}

export default CartDrawer;
