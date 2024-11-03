import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import { getOrdersThunk } from "../../../Redux/Thunks/OrderApi";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";
// CSS
import "./Order.scss";

function Order() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.orders);
  const branches = useSelector((state) => state.branchSlice.branches);
  const menu = useSelector((state) => state.menuSlice.menu);

  // const orders = [
  // {
  //   _id: "671e6ff04bea31ba71bb80b1",
  //   customerId: "671660cfee058464c3f8ea78",
  //   branchId: "670fd77c110152d4ef2319a3",
  //   type: "Takeaway",
  //   status: "Pending",
  //   order: [
  //     {
  //       qty: 1,
  //       itemId: "67135a5bb6b12376db14d7bc",
  //       category: "Burger",
  //       price: 400,
  //     },
  //     {
  //       qty: 1,
  //       itemId: "670d6dd5f5fd09ffcde6b8d8",
  //       category: "Fries",
  //       price: 1232,
  //     },
  //   ],
  //   totalBill: 1632,
  //   createdAt: "2024-10-27T16:53:04.176Z",
  //   updatedAt: "2024-10-27T16:53:04.176Z",
  //   __v: 0,
  //   customerName: "ads",
  //   customerAddress: "gulshand address",
  //   phoneNumber: "+92 33376890",
  //   email: "User@gmail.com",
  // },
  //   {
  //     _id: "671e6ff04bea31ba71bb80b1",
  //     customerId: "671660cfee058464c3f8ea78",
  //     branchId: "670fd77c110152d4ef2319a3",
  //     type: "Delivery",
  //     status: "Pending",
  //     order: [
  //       {
  //         qty: 1,
  //         itemId: "67135a5bb6b12376db14d7bc",
  //         category: "Burger",
  //         price: 400,
  //       },
  //       {
  //         qty: 1,
  //         itemId: "670d6dd5f5fd09ffcde6b8d8",
  //         category: "Fries",
  //         price: 1232,
  //       },
  //     ],
  //     totalBill: 1632,
  //     createdAt: "2024-10-27T16:53:04.176Z",
  //     updatedAt: "2024-10-27T16:53:04.176Z",
  //     __v: 0,
  //     customerName: "ads",
  //     customerAddress: "gulshand address",
  //     phoneNumber: "+92 33376890",
  //     email: "User@gmail.com",
  //   },
  //   {
  //     _id: "671e6ff04bea31ba71bb80b1",
  //     customerId: "671660cfee058464c3f8ea78",
  //     branchId: "670fd77c110152d4ef2319a3",
  //     type: "Takeaway",
  //     status: "Pending",
  //     order: [
  //       {
  //         qty: 1,
  //         itemId: "67135a5bb6b12376db14d7bc",
  //         category: "Burger",
  //         price: 400,
  //       },
  //       {
  //         qty: 1,
  //         itemId: "670d6dd5f5fd09ffcde6b8d8",
  //         category: "Fries",
  //         price: 1232,
  //       },
  //     ],
  //     totalBill: 1632,
  //     createdAt: "2024-10-27T16:53:04.176Z",
  //     updatedAt: "2024-10-27T16:53:04.176Z",
  //     __v: 0,
  //     customerName: "ads",
  //     customerAddress: "gulshand address",
  //     phoneNumber: "+92 33376890",
  //     email: "User@gmail.com",
  //   },
  // ];

  // const branches = [
  //   {
  //     _id: "670fd77c110152d4ef2319a3",
  //     address: "house abc, street 123, sector abc, pwd, Rawalpindi",
  //     contactNum: "923245653423",
  //     tables: [
  //       {
  //         seatingSize: "4",
  //         qty: "9",
  //         id: "88f7ec33-b884-4d6e-8722-20a678701d5d",
  //       },
  //     ],
  //     createdAt: "2024-10-16T15:10:52.762Z",
  //     updatedAt: "2024-10-19T13:52:14.649Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "670fd7c2110152d4ef2319a6",
  //     address: "asdfaad",
  //     contactNum: "925467677777",
  //     tables: [
  //       {
  //         seatingSize: "2",
  //         qty: "10",
  //         id: "d12f01cc-64f7-498c-98ef-4107d252fb60",
  //       },
  //       {
  //         seatingSize: "4",
  //         qty: "5",
  //         id: "d6f00c37-8fdf-4537-b642-72ea093f898b",
  //       },
  //     ],
  //     createdAt: "2024-10-16T15:12:02.898Z",
  //     updatedAt: "2024-10-21T17:50:47.800Z",
  //     __v: 0,
  //   },
  // ];

  useEffect(() => {
    dispatch(getOrdersThunk());
    dispatch(getBranchThunk());
    dispatch(getMenuThunk());
  }, []);
  return (
    <>
      <div className="min-h-[80vh] max-w-[100vw]">
        {/* <div> */}
        <h1 className="Branch_H">Your Order</h1>
        <br />
        {orders?.map((orderDetails) => (
          <div>
            <Details
              orderDetails={orderDetails}
              branches={branches}
              menu={menu}
            />
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

function Details({ orderDetails, branches, menu }) {
  const {
    order,
    branchId,
    customerName,
    phoneNumber,
    email,
    totalBill,
    status,
    type,
    customerAddress,
    createdAt,
    _id: orderId,
  } = orderDetails;

  const branchAddress = branches?.find(({ _id }) => _id == branchId);
  //   console.log(address);

  return (
    // --- New User Admin Part Design ---
    <div className="Parent_UserOrder_Whole">
      {/* Box */}
      <div className="UserOrder_Box">
        {/* --- Box Part 1 --- */}
        <div className="UserOrder_Box_Part_1">
          <h1>Thank you for your Purchase!</h1>
          <p>
            Status : <span>{status}</span>
          </p>
          <div className="UserOrder_Box_Part1_Box">
            {/* H3 */}
            <h3>Billing Address</h3>
            {/* - Line - */}
            <div className="UserOrder_Box_Part1_Box_L_Parent">
              <p className="UserOrder_Box_Part1_Box_L1">Name :</p>
              <p className="UserOrder_Box_Part1_Box_L2">{customerName}</p>
            </div>
            {/* - Line - */}
            {branchAddress && (
              <div className="UserOrder_Box_Part1_Box_L_Parent">
                <p className="UserOrder_Box_Part1_Box_L1">Branch :</p>
                <p className="UserOrder_Box_Part1_Box_L2">
                  {branchAddress?.address}
                </p>
              </div>
            )}
            {/* - Line - */}
            {type == "Delivery" && (
              <div className="UserOrder_Box_Part1_Box_L_Parent">
                <p className="UserOrder_Box_Part1_Box_L1">Address :</p>
                <p className="UserOrder_Box_Part1_Box_L2">{customerAddress}</p>
              </div>
            )}
            {/* - Line - */}
            <div className="UserOrder_Box_Part1_Box_L_Parent">
              <p className="UserOrder_Box_Part1_Box_L1">Phone :</p>
              <p className="UserOrder_Box_Part1_Box_L2">
                {phoneNumber ?? "0321-7875903"}
              </p>
            </div>
            {/* - Line - */}
            <div className="UserOrder_Box_Part1_Box_L_Parent">
              <p className="UserOrder_Box_Part1_Box_L1">Email :</p>
              <p className="UserOrder_Box_Part1_Box_L2">
                {email ?? "User@gmail.com"}
              </p>
            </div>
          </div>
        </div>
        {/* --- Box Part 2 --- */}
        <div className="UserOrder_Box_Part_2">
          {/* - Paragraph Line - */}
          <p className="UserOrder_Box_Part_2_P"></p>
          <div className="UserOrder_Box_Part_2_Box_Parent">
            <div className="UserOrder_Box_Part_2_Box">
              {/* - Sub Box - */}
              <h1>Order Summary</h1>
              {/* - Sub Box - */}
              <div className="UserOrder_Box_Part_2_Box_Part_1">
                {/* Small Box */}
                <div className="UserOrder_Box_Part_2_Box_Part_1_A">
                  <p>Date</p>
                  <h3>{createdAt.split("T")[0]} </h3>
                </div>
                {/* Small Box */}
                <div className="UserOrder_Box_Part_2_Box_Part_1_A">
                  <p>Order ID</p>
                  <h3>{orderId.slice(-5).toUpperCase()}</h3>
                </div>
                {/* Small Box */}
                <div className="UserOrder_Box_Part_2_Box_Part_1_A">
                  <p>Type</p>
                  <h3>{type}</h3>
                </div>
              </div>
              {/* - Sub Box - */}
              <div className="UserOrder_Box_Part_2_Box_Part_2">
                {/* All Items Small Box */}
                {order?.map((orderItem) => {
                  const menuItem = menu[orderItem.category]?.find(
                    ({ _id }) => orderItem.itemId == _id
                  );
                  return (
                    <div className="UserOrder_Box_Part_2_Box_Part_2_A">
                      <div className="UserOrder_Box_Part_2_Box_Part_2_A_1">
                        {orderItem.qty} x {menuItem?.name ?? "Zinger"}
                      </div>
                      <div className="UserOrder_Box_Part_2_Box_Part_2_A_2">
                        {orderItem.price}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* - Sub Box - */}
              <div className="UserOrder_Box_Part_2_Box_Part_3">
                <p className="UserOrder_Box_Part_2_Box_Part_3_A">Total Bill</p>
                <p className="UserOrder_Box_Part_2_Box_Part_3_B">{totalBill}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // --- Old ---
    // <>
    //   <p>Customer Name {customerName}</p>
    //   <p>Customer Phone Number {phoneNumber}</p>
    //   <p>Customer Email {email}</p>
    //   {branchAddress && <p>Address: {branchAddress?.address}</p>}
    //   {type == "Delivery" && <p>Deleivery Address {customerAddress}</p>}
    //   <p>order ID {orderId.slice(-5)}</p>
    //   <div>
    //     Items
    //     {order?.map((orderItem) => {
    //       const menuItem = menu[orderItem.category]?.find(
    //         ({ _id }) => orderItem.itemId == _id
    //       );
    //       return (
    //         <>
    //           <div>
    //             {orderItem.qty} x {menuItem?.name ?? "Zinger"}
    //           </div>
    //           <div>Price {orderItem.price}</div>
    //         </>
    //       );
    //     })}
    //   </div>
    //   <div>Total Bill {totalBill}</div>
    //   <p>Status {status}</p>

    //   <p>Type {type}</p>
    // </>
  );
}

export default Order;
