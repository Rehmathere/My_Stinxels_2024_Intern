import {
  Button,
  Table,
  Form,
  DatePicker,
  TimePicker,
  InputNumber,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import {
  getReservationThunk,
  updateReservationThunk,
  deleteReservationThunk,
} from "../../../Redux/Thunks/ReservationApi";
import ModalComponent from "../../ModalComponent/ModalComponent";
import to24Hour from "../../../Utils/to24Hour";
import processDateTime from "../../../Utils/processDateTime";
import { useForm } from "antd/es/form/Form";
// CSS
import "../Branch/Branch.scss";

function Reservations() {
  const [form] = useForm();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateReservationObj, setUpdateReservationObj] = useState({});
  const [reservationMethod, setReservationMethod] = useState("");
  const branches = useSelector((state) => state.branchSlice.branches);
  const reservations = useSelector(
    (state) => state.reservationSlice.reservations
  );

  const dummyData = [
    {
      customerId: "671660cfee058464c3f8ea78",
      branchId: "670fd77c110152d4ef2319a3",
      date: "2024-10-22",
      startTime: "22:00:00.000Z",
      endTime: "01:00:00.000Z",
      peopleQty: 2,
      _id: "6717b24dc98ac43f524f7019",
      createdAt: "2024-10-22T14:10:21.234Z",
      updatedAt: "2024-10-22T14:10:21.234Z",
      __v: 0,
      customerName: "ads",
    },
    {
      customerId: "671660cfee058464c3f8ea78",
      branchId: "670fd77c110152d4ef2319a3",
      date: "2024-10-22",
      startTime: "22:00:00.000Z",
      endTime: "01:00:00.000Z",
      peopleQty: 2,
      _id: "6717b24dc98ac43f524f7019",
      createdAt: "2024-10-22T14:10:21.234Z",
      updatedAt: "2024-10-22T14:10:21.234Z",
      __v: 0,
      customerName: "ads",
    },
  ];

  useEffect(() => {
    dispatch(getBranchThunk());
    dispatch(getReservationThunk());
  }, []);

  const updateReservation = (body) => {
    const { _id, customerName, customerId } = updateReservationObj;
    body = { ...body, ...processDateTime(body), _id, customerName, customerId };
    console.log("updated reservation", body);
    setUpdateReservationObj({});
    dispatch(updateReservationThunk(body));
  };

  const deleteReservation = (_id, customerId) => {
    console.log(_id);

    dispatch(deleteReservationThunk({ _id, customerId }));
  };

  const openModal = (reservationMethodText) => {
    setIsModalOpen(true);
    setReservationMethod(reservationMethodText);
  };

  const updateModal = (reservationItemObj) => {
    setUpdateReservationObj({ ...reservationItemObj });
    openModal("Update");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdateReservationObj({});
    form.resetFields();
  };

  const setForm = () => {
    const { branchId, date, startTime, endTime, peopleQty } =
      updateReservationObj;
    console.log(updateReservationObj);
    if (!startTime) {
      return [{}];
    } else {
      return [
        { name: "branchId", value: branchId },
        { name: "date", value: dayjs(date) },
        {
          name: "time",
          value: [dayjs(startTime, "HH:mm:ssZ"), dayjs(endTime, "HH:mm:ssZ")],
        },
        { name: "peopleQty", value: peopleQty },
      ];
    }
  };

  const FormContent = () => {
    const handleFinsih = (body) => {
      console.log(body);
      const reservationActions = {
        Update: () => updateReservation(body),
      };
      reservationActions[reservationMethod]();
      form.resetFields();
      setIsModalOpen(false);
    };
    const format = "HH:mm";
    return (
      <>
        <Form form={form} onFinish={handleFinsih} layout="vertical">
          <Form.Item name={"branchId"} label="Select Branch for Reservation ">
            <Select
              placeholder="Select Branch"
              allowClear={true}
              options={branches?.map(({ _id, address }) => ({
                value: _id,
                label: address,
              }))}
            />
          </Form.Item>
          <Form.Item name={"date"} label="Select Reservation Date">
            <DatePicker
              format={{
                format: "YYYY-MM-DD",
              }}
            />
          </Form.Item>
          <Form.Item name={"time"} label="Select Reservation Time">
            <TimePicker.RangePicker
              format={format}
              minuteStep={30}
              showNow={true}
              needConfirm={true}
            />
          </Form.Item>
          <Form.Item name={"peopleQty"} label="Select Number of People">
            <InputNumber
              addonBefore={<UserOutlined />}
              placeholder="Enter Qty of People"
            />
          </Form.Item>
        </Form>
      </>
    );
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (_, record) => {
        return <>{"Rehmat Qazi"}</>;
      },
    },
    {
      title: "Branch",
      dataIndex: "branchId",
      key: "branchId",
      render: (_, record) => {
        const address = "house abc, street 123, sector abc, pwd, Rawalpindi";
        // const address = branches?.find(
        //   ({ _id }) => record.branchId === _id
        // )?.address;
        return <>{address}</>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (_, record) => to24Hour(record.startTime),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (_, record) => to24Hour(record.endTime),
    },
    {
      title: "People Qty",
      dataIndex: "peopleQty",
      key: "peopleQty",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary" ghost onClick={() => updateModal(record)}>
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            danger
            ghost
            onClick={() => deleteReservation(record._id, record.customerId)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="min-h-[80vh] max-w-[100vw]">
        {/* <div> */}
        <h1 className="Branch_H">Reservations</h1>
        <br />
        <ModalComponent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setForm={setForm}
          form={form}
          FormContent={FormContent}
          handleCancel={handleCancel}
        />
        <Table dataSource={dummyData} columns={columns} />
      </div>
    </>
  );
}

export default Reservations;
