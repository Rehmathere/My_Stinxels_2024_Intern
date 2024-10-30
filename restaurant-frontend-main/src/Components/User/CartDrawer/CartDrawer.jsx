import React, { useEffect, useState } from "react";
import { Drawer, Button, Form, Radio, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrementQty,
  removeFromCart,
} from "../../../Redux/Slices/UserSlice";
import { addOrderThunk } from "../../../Redux/Thunks/OrderApi";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import { getUserInfoThunk } from "../../../Redux/Thunks/UserApi";
import ModalComponent from "../../ModalComponent/ModalComponent";
import { EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
// CSS
import "./CartDrawer.scss";

function CartDrawer({ open, setOpen }) {
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.userSlice.cart);
  const menu = useSelector((state) => state.menuSlice.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const cart = [
    {
      category: "Burger",
      _id: "67135a5bb6b12376db14d7bc",
      qty: 1,
    },
    {
      category: "Fries",
      _id: "670d6dd5f5fd09ffcde6b8d8",
      qty: 3,
    },
    {
      category: "Fries",
      _id: "670d778ff5fd09ffcde6b8fa",
      qty: 1,
    },
    {
      category: "Fries",
      _id: "670f47ae4f689237d6de624b",
      qty: 1,
    },
  ];

  const addItem = (body) => {
    dispatch(addToCart(body));
  };

  const decreaseQty = (body) => {
    dispatch(decrementQty(body));
  };

  const removeItem = (body) => {
    dispatch(removeFromCart(body));
  };

  const Footer = () => {
    const findPrice = (category, _id) => {
      const { price } = menu[category]?.find(
        (menuItems) => menuItems._id == _id
      );
      return parseInt(price);
    };

    return (
      <>
        {/* --- New Footer Design ---  */}
        <div className="Footer_Box">
          <div className="Footer_Part_1">
            <p>Total Cost</p>
            <h1>$ 7550</h1>
          </div>
          <div className="Footer_Part_2">
            <button>Place Order</button>
          </div>
        </div>
        {/* --- Old Footer ---  */}
        {/* <Button onClick={() => setIsModalOpen(true)}>Place Order</Button> */}
        {/* {cart.length != 0 && (
          <span>
            {cart.reduce(
              (accumulator, { category, qty, _id }) =>
                accumulator + findPrice(category, _id) * qty,
              0
            )}
          </span>
        )} */}
        {/* 7550 */}
      </>
    );
  };

  const setForm = () => {
    return [{}];
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title="My Order"
        width={520}
        onClose={() => setOpen(false)}
        open={open}
        footer={<Footer />}
      >
        {cart?.map((cartItem) => {
          // const menuItem = menu[cartItem?.category]?.find(
          //   (menuItems) => menuItems?._id == cartItem?._id
          // );
          // console.log(menuItem, "cartItem map");
          const menuItem = {};
          return (
            <>
              {/* --- New Cart Drawer Design --- */}

              {/* --- Old --- */}
              <div className="Menu_Item_Box">
                <div className="Menu_Item_Box_Sub">
                  <div className="Menu_Item_Box_Sub_Part1">
                    <p className="Menu_Item_P1">{menuItem?.name ?? "Zinger"}</p>
                    <span>
                      {menuItem?.description ??
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, voluptatem temporibus "}{" "}
                    </span>
                    <p className="Menu_Item_P2">
                      PKR {menuItem?.priceprice ?? "Zinger"}
                    </p>
                  </div>
                  <div className="Menu_Item_Box_Sub_Part2">
                    {/* <img src={img} alt={name} /> */}
                  </div>
                  <div>Price {menuItem.price}</div>
                  <div>Qty {cartItem.qty}</div>
                  <div>Total Price {menuItem?.price ?? 550 * cartItem.qty}</div>
                  <Button onClick={() => addItem(menuItem)}>+</Button>

                  <Button onClick={() => decreaseQty(menuItem)}>-</Button>
                  <Button onClick={() => removeItem(menuItem)}>Delete</Button>
                </div>
              </div>
              <br />
            </>
          );
        })}
      </Drawer>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        setForm={setForm}
        FormContent={() => ConfirmOrder(form)}
        handleCancel={handleCancel}
      />
    </>
  );
}

const ConfirmOrder = (form) => {
  const branches = useSelector((state) => state.branchSlice?.branches);
  const cart = useSelector((state) => state.userSlice.cart);
  const address = useSelector((state) => state.userSlice.address);
  const dispatch = useDispatch();
  const [render, setRender] = useState(1);
  const [editAddress, setEditAddress] = useState(true);

  useEffect(() => {
    dispatch(getBranchThunk());
    dispatch(getUserInfoThunk());
    form.setFields([{ name: "address", value: address }]);
  }, []);

  const handleFinish = (body) => {
    body = {
      ...body,
      type: render == 1 ? "Delivery" : "Takeaway",
      order: cart?.map(({ category, _id, qty }) => ({
        qty,
        itemId: _id,
        category,
      })),
    };
    dispatch(addOrderThunk(body));
    console.log(body);
  };

  return (
    <>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item>
          <Radio.Group
            onChange={(e) => setRender(e.target.value)}
            value={render}
          >
            <Radio value={1}>Delivery</Radio>
            <Radio value={2}>Takeaway</Radio>
          </Radio.Group>
        </Form.Item>

        {render == 1 && (
          <Form.Item name={"address"}>
            <Input
              value={address}
              readOnly={editAddress}
              suffix={
                <div onClick={() => setEditAddress(false)}>
                  <EditOutlined />
                </div>
              }
            ></Input>
          </Form.Item>
        )}
        {render == 2 && (
          <Form.Item name={"branchId"}>
            <Select
              placeholder="Select Branch"
              allowClear={true}
              options={branches?.map(({ _id, address }) => ({
                value: _id,
                label: address,
              }))}
            />
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default CartDrawer;
