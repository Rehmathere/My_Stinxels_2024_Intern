import React, { useState, useEffect } from "react";
import { Button, Table, Descriptions, Select, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import {
  getOrdersThunk,
  updateOrderStatusThunk,
} from "../../../Redux/Thunks/OrderApi";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";
import to24Hour from "../../../Utils/to24Hour";

function Orders() {
  const dispatch = useDispatch();
  //   const orders = useSelector((state) => state.orderSlice.orders);
  //   const branches = useSelector((state) => state.branchSlice.branches);
  const menu = useSelector((state) => state.menuSlice.menu);
  const [orderDetailsId, setOrderDetailsId] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);

  const orders = [
    {
      _id: "671e6ff04bea31ba71bb80b1",
      customerId: "671660cfee058464c3f8ea78",
      branchId: "670fd77c110152d4ef2319a3",
      type: "Takeaway",
      status: "Pending",
      order: [
        {
          qty: 1,
          itemId: "67135a5bb6b12376db14d7bc",
          category: "Burger",
          price: 400,
        },
        {
          qty: 1,
          itemId: "670d6dd5f5fd09ffcde6b8d8",
          category: "Fries",
          price: 1232,
        },
      ],
      totalBill: 1632,
      createdAt: "2024-10-27T16:53:04.176Z",
      updatedAt: "2024-10-27T16:53:04.176Z",
      __v: 0,
      customerName: "ads",
      customerAddress: "gulshand address",
    },
    {
      _id: "671e6ff04bea31ba71bb80b1",
      customerId: "671660cfee058464c3f8ea78",
      branchId: "670fd77c110152d4ef2319a3",
      type: "Delivery",
      status: "Pending",
      order: [
        {
          qty: 1,
          itemId: "67135a5bb6b12376db14d7bc",
          category: "Burger",
          price: 400,
        },
        {
          qty: 1,
          itemId: "670d6dd5f5fd09ffcde6b8d8",
          category: "Fries",
          price: 1232,
        },
      ],
      totalBill: 1632,
      createdAt: "2024-10-27T16:53:04.176Z",
      updatedAt: "2024-10-27T16:53:04.176Z",
      __v: 0,
      customerName: "ads",
      customerAddress: "gulshand address",
    },
    {
      _id: "671e6ff04bea31ba71bb80b1",
      customerId: "671660cfee058464c3f8ea78",
      branchId: "670fd77c110152d4ef2319a3",
      type: "Takeaway",
      status: "Pending",
      order: [
        {
          qty: 1,
          itemId: "67135a5bb6b12376db14d7bc",
          category: "Burger",
          price: 400,
        },
        {
          qty: 1,
          itemId: "670d6dd5f5fd09ffcde6b8d8",
          category: "Fries",
          price: 1232,
        },
      ],
      totalBill: 1632,
      createdAt: "2024-10-27T16:53:04.176Z",
      updatedAt: "2024-10-27T16:53:04.176Z",
      __v: 0,
      customerName: "ads",
      customerAddress: "gulshand address",
    },
  ];

  const branches = [
    {
      _id: "670fd77c110152d4ef2319a3",
      address: "house abc, street 123, sector abc, pwd, Rawalpindi",
      contactNum: "923245653423",
      tables: [
        {
          seatingSize: "4",
          qty: "9",
          id: "88f7ec33-b884-4d6e-8722-20a678701d5d",
        },
      ],
      createdAt: "2024-10-16T15:10:52.762Z",
      updatedAt: "2024-10-19T13:52:14.649Z",
      __v: 0,
    },
    {
      _id: "670fd7c2110152d4ef2319a6",
      address: "asdfaad",
      contactNum: "925467677777",
      tables: [
        {
          seatingSize: "2",
          qty: "10",
          id: "d12f01cc-64f7-498c-98ef-4107d252fb60",
        },
        {
          seatingSize: "4",
          qty: "5",
          id: "d6f00c37-8fdf-4537-b642-72ea093f898b",
        },
      ],
      createdAt: "2024-10-16T15:12:02.898Z",
      updatedAt: "2024-10-21T17:50:47.800Z",
      __v: 0,
    },
  ];

  useEffect(() => {
    dispatch(getOrdersThunk());
    dispatch(getBranchThunk());
    dispatch(getMenuThunk());
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Order ID ",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => record?._id?.slice(-6),
    },
    {
      title: "Order Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Total Bill",
      dataIndex: "totalBill",
      key: "totalBill",
      render: (_, record) => record?.totalBill,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) =>
        `${record?.createdAt.split("T")[0]} at ${to24Hour(
          record?.createdAt.split("T")[1]
        )}`,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setOrderDetailsId(record._id);
            setOpenDrawer(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-[80vh] max-w-[100vw]">
        <h1 className="Branch_H">Orders</h1>
        <br />
        <Table dataSource={orders} columns={columns} />
        <Drawer
          title="My Order"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Details
            orderDetails={orders?.find(({ _id }) => orderDetailsId == _id)}
            branches={branches}
            menu={menu}
          />
        </Drawer>
      </div>
    </>
  );
}

function Details({ orderDetails, branches, menu }) {
  const {
    order,
    branchId,
    customerName,
    customerId,
    totalBill,
    status,
    type,
    customerAddress,
    _id: orderId,
  } = orderDetails;
  console.log(branches);

  const dispatch = useDispatch();

  const branchAddress = branches?.find(({ _id }) => _id == branchId);
  //   console.log(address);

  const handleStatusChange = (status) => {
    console.log(status, orderId);
    dispatch(updateOrderStatusThunk({ status, orderId, customerId }));
  };

  return (
    <>
      <p>Customer Name {customerName}</p>
      {branchAddress && <p>Address: {branchAddress?.address}</p>}
      {type == "Delivery" && <p>Deleivery Address {customerAddress}</p>}
      <p>order ID {orderId.slice(-5)}</p>
      <div>
        Items
        {order?.map((orderItem) => {
          const menuItem = menu[orderItem?.category]?.find(
            ({ _id }) => orderItem.itemId == _id
          );
          return (
            <>
              <div>
                {orderItem?.qty} x {menuItem?.name ?? "Zinger"}
              </div>
              <div>Price {orderItem?.price}</div>
            </>
          );
        })}
      </div>
      <div>Total Bill {totalBill}</div>
      <p>Status {status}</p>
      <Select
        defaultValue={status}
        style={{ width: 120 }}
        onChange={(value) => handleStatusChange(value)}
        options={[
          { value: "pending", label: "Pending" },
          { value: "prepairing", label: "Prepairing" },
          { value: "ready", label: "Ready" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
      <p>Type {type}</p>
    </>
  );
}

export default Orders;
