import React, { useState, useEffect } from "react";
import ModalComponent from "../../ModalComponent/ModalComponent";
import {
  Form,
  Input,
  DatePicker,
  Button,
  TimePicker,
  InputNumber,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getBranchThunk } from "../../../Redux/Thunks/BranchApi";
import {
  addReservationThunk,
  updateReservationThunk,
  deleteReservationThunk,
  getReservationThunk,
} from "../../../Redux/Thunks/ReservationApi";
import { useForm } from "antd/es/form/Form";
import { useSelector, useDispatch } from "react-redux";
import to24Hour from "../../../Utils/to24Hour";
import processDateTime from "../../../Utils/processDateTime";
import moment from "moment";
import dayjs from "dayjs";
function Reservation() {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateReservationObj, setUpdateReservationObj] = useState({});
  const [reservationMethod, setReservationMethod] = useState("");
  const branches = useSelector((state) => state.branchSlice.branches);
  const reservations = useSelector(
    (state) => state.reservationSlice.reservations
  );
  console.log("reservations in component", reservations);

  const addReservation = (body) => {
    body = { ...body, ...processDateTime(body) };
    console.log(body);

    dispatch(addReservationThunk(body));
  };

  const updateReservation = (body) => {
    const { _id } = updateReservationObj;
    body = { ...body, ...processDateTime(body), _id };
    console.log("updated reservation", body);
    setUpdateReservationObj({});
    dispatch(updateReservationThunk(body));
  };

  const deleteReservation = (_id) => {
    console.log(_id);

    dispatch(deleteReservationThunk({ _id }));
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

  useEffect(() => {
    dispatch(getBranchThunk());
    dispatch(getReservationThunk());
  }, []);

  const FormContent = () => {
    const handleFinsih = (body) => {
      console.log(body);
      const reservationActions = {
        Add: () => addReservation(body),
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

  return (
    <>
      <Button onClick={() => openModal("Add")}>Add a Reservation</Button>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setForm={setForm}
        form={form}
        FormContent={FormContent}
        handleCancel={handleCancel}
      />
      {reservations?.map(
        ({ branchId, peopleQty, date, startTime, endTime, _id }) => {
          const address = branches?.find(
            ({ _id }) => branchId === _id
          )?.address;
          console.log("in div rendered");

          return (
            <div className="" key={_id}>
              <p>People Qty: {peopleQty}</p>
              <p>Date: {date}</p>
              <p>Start Time: {to24Hour(startTime)}</p>
              <p>End Time: {to24Hour(endTime)}</p>
              <p>Address: {address}</p>

              <Button
                onClick={() =>
                  updateModal({
                    branchId,
                    peopleQty,
                    date,
                    startTime,
                    endTime,
                    _id,
                  })
                }
              >
                Edit
              </Button>
              <Button onClick={() => deleteReservation(_id)}>Delete</Button>
            </div>
          );
        }
      )}
    </>
  );
}

export default Reservation;
