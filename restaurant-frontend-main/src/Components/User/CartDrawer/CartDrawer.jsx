import React, { useEffect, useState } from "react";
import { Drawer, Button, Form, Radio, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { getUserId } from "../../../Utils/getUserId";
import {
  addToCart,
  decrementQty,
  removeFromCart,
  emptyCart,
} from "../../../Redux/Slices/UserSlice";
import { addOrderThunk } from "../../../Redux/Thunks/OrderApi";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import { getUserInfoThunk } from "../../../Redux/Thunks/UserApi";
import ModalComponent from "../../ModalComponent/ModalComponent";
import { EditOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
// CSS
import "./CartDrawer.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { showError } from "../../Toaster/Toaster";

import { parsePhoneNumberFromString } from "libphonenumber-js";

function CartDrawer({ open, setOpen }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userSlice.cart);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  const menu = useSelector((state) => state.menuSlice.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, []);

  // const cart = [
  //   {
  //     category: "Burger",
  //     _id: "67135a5bb6b12376db14d7bc",
  //     qty: 1,
  //   },
  // {
  //   category: "Fries",
  //   _id: "670d6dd5f5fd09ffcde6b8d8",
  //   qty: 3,
  // },
  // {
  //   category: "Fries",
  //   _id: "670d778ff5fd09ffcde6b8fa",
  //   qty: 1,
  // },
  // {
  //   category: "Fries",
  //   _id: "670f47ae4f689237d6de624b",
  //   qty: 1,
  // },
  // ];

  const Footer = () => {
    const findPrice = (categoryId, _id) => {
      console.log("categoryId", categoryId, "_id", _id);

      const { price } = menu[categoryId]?.find(
        (menuItems) => menuItems._id == _id
      );
      return parseInt(price);
    };

    const handleOrder = () => {
      if (cart?.length == 0) {
        showError("Cart is Empty");
        return;
      }

      const { _id } = getUserId();
      if (!_id) {
        showError("Please SignIn to place Order");
        navigate("/login");
      } else {
        setIsModalOpen(true);
      }
    };

    return (
      <>
        {/* --- New Footer Design ---  */}
        <div className="Footer_Box">
          <div className="Footer_Part_1">
            <p>Total Cost</p>
            <h1>
              {cart.reduce(
                (accumulator, { categoryId, qty, _id }) =>
                  accumulator + findPrice(categoryId, _id) * qty,
                0
              )}
            </h1>
          </div>
          <div className="Footer_Part_2">
            <button onClick={handleOrder}>Place Order</button>
          </div>
        </div>
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

  const CartItem = ({ cartItem }) => {
    const [editOptions, setEditOptions] = useState(true);
    const menuItem = menu[cartItem?.categoryId]?.find(
      (menuItems) => menuItems?._id == cartItem?._id
    );
    console.log(menuItem, "cartItem map");
    console.log("cartItem -----", cartItem);

    const addItem = () => {
      const { categoryId, _id } = menuItem;
      dispatch(addToCart({ categoryId, _id }));
    };

    const decreaseQty = () => {
      const { categoryId, _id } = menuItem;
      dispatch(decrementQty({ categoryId, _id }));
    };

    const removeItem = () => {
      const { _id } = menuItem;
      dispatch(removeFromCart({ _id }));
    };

    return (
      <>
        {/* --- New Cart Drawer Design --- */}

        {/* --- Old --- */}
        <div className="w-full h-[84px] flex gap-2">
          <div className="h-[50px] w-[71px]">
            <img
              className="object-cover rounded-md h-full w-full"
              src="https://imageproxy.wolt.com/menu/menu-images/5f71921263a6ac41b4e98c3c/8f2cae5a-67a5-11eb-aa3c-46efe57ab807__mann_o_salwa_45.jpeg?w=200"
              alt=""
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold">{menuItem?.name}</h4>
              <p className="text-green-300">{menuItem?.price}</p>
            </div>
            <div
              onMouseEnter={() => setEditOptions(false)}
              onMouseLeave={() => setEditOptions(true)}
            >
              {editOptions ? (
                <Button type="primary" ghost>
                  {cartItem?.qty}
                </Button>
              ) : (
                <div className=" h-[44px] max-w-[170px] w-full flex justify-center items-center gap-6 p-2 bg-green-100 hover:bg-green-200 rounded-l-lg">
                  <div
                    onClick={decreaseQty}
                    className="w-[32px] h-[32px] bg-white flex justify-center items-center rounded-full"
                  >
                    <FaMinus color="green" />
                  </div>
                  <p className=" text-green-950 font-semibold">
                    {cartItem?.qty}
                  </p>
                  <div
                    onClick={addItem}
                    className="w-[32px] h-[32px] bg-white flex justify-center items-center rounded-full"
                  >
                    <FaPlus color="green" />
                  </div>
                  <div className="" onClick={removeItem}>
                    <FaTrashAlt color="green" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Drawer
        className="assad"
        title="My Order"
        width={520}
        onClose={() => setOpen(false)}
        open={open}
        footer={<Footer />}
      >
        {cart?.map((cartItem) => (
          <CartItem cartItem={cartItem} />
        ))}
      </Drawer>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        setForm={setForm}
        FormContent={() =>
          ConfirmOrder(form, userInfo, handleCancel, navigate, setOpen)
        }
        handleCancel={handleCancel}
      />
    </>
  );
}

const ConfirmOrder = (form, userInfo, handleCancel, navigate, setOpen) => {
  const branches = useSelector((state) => state.branchSlice?.branches);
  const cart = useSelector((state) => state.userSlice.cart);
  const { address, contactNum, email } = userInfo;
  // const address = useSelector((state) => state.userSlice.address);
  const dispatch = useDispatch();
  const [render, setRender] = useState(1);
  const [editAddress, setEditAddress] = useState(true);
  const [editEmail, setEditEmail] = useState(true);

  useEffect(() => {
    dispatch(getBranchThunk());
    // dispatch(getUserInfoThunk());
    form.setFields([
      { name: "address", value: address },
      { name: "contactNum", value: contactNum },
      { name: "email", value: email },
    ]);
  }, []);

  const handleFinish = (body) => {
    const address =
      body.address == userInfo.address ? userInfo.address : body.address;
    const contactNum =
      body.contactNum == userInfo.contactNum
        ? userInfo.contactNum
        : body.contactNum;
    const email = body.email == userInfo.email ? userInfo.email : body.email;
    body = {
      ...body,
      address,
      contactNum,
      email,
      type: render == 1 ? "Delivery" : "Takeaway",
      order: cart?.map(({ categoryId, _id, qty }) => ({
        qty,
        itemId: _id,
        categoryId,
      })),
    };

    dispatch(addOrderThunk(body));
    handleCancel();
    navigate("/user/order");
    dispatch(emptyCart());
    setOpen(false);
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name={"contactNum"}
          label="Contact Number"
          rules={[
            { required: true, message: "Please input your Contact Number" },
          ]}
        >
          <PhoneInput country={"pk"} />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            { required: true, message: "Please input your Email" },
            {
              type: "email",
            },
          ]}
        >
          <Input
            readOnly={editEmail}
            suffix={
              <div onClick={() => setEditEmail(false)}>
                <EditOutlined />
              </div>
            }
          ></Input>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please select an Option" }]}
        >
          <Radio.Group
            onChange={(e) => setRender(e.target.value)}
            value={render}
          >
            <Radio value={1}>Delivery</Radio>
            <Radio value={2}>Takeaway</Radio>
          </Radio.Group>
        </Form.Item>

        {render == 1 && (
          <Form.Item
            name={"address"}
            rules={[{ required: true, message: "Please input your Address" }]}
          >
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
          <Form.Item
            name={"branchId"}
            rules={[{ required: true, message: "Please select a Branch" }]}
          >
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
