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
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
// CSS
import "./User_Reserve.scss";
// Images
import Reserve_Img from "../../../assets/correct.png";

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

  const addReservation = (body) => {
    body = { ...body, ...processDateTime(body) };
    console.log(body);

    dispatch(addReservationThunk(body));
  };

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

    const disabledDate = (current) => {
      return current && current < moment().startOf("day");
    };
    const format = "HH:mm";
    return (
      <>
        <Form
          form={form}
          onFinish={handleFinsih}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name={"branchId"}
            label="Select Branch for Reservation "
            rules={[
              {
                required: true,
                message: "Please select branch for reservation",
              },
            ]}
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
          <Form.Item
            name={"date"}
            label="Select Reservation Date"
            rules={[
              { required: true, message: "Please select reservation date" },
            ]}
          >
            <DatePicker
              disabledDate={disabledDate}
              format={{
                format: "YYYY-MM-DD",
              }}
            />
          </Form.Item>
          <Form.Item
            name={"time"}
            label="Select Reservation Time"
            rules={[
              { required: true, message: "Please select reservation time" },
            ]}
          >
            <TimePicker.RangePicker
              disabledTime={(e) => console.log(e)}
              format={format}
              minuteStep={30}
              showNow={true}
              needConfirm={true}
            />
          </Form.Item>
          <Form.Item
            name={"peopleQty"}
            label="Select Number of People"
            rules={[
              { required: true, message: "Please select Number of People" },
            ]}
          >
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
      <div className="min-h-[80vh] max-w-[100vw]">
        {/* <div> */}
        <h1 className="Branch_H">Your Reservation</h1>
        <div className="Parent_Branch_Btn">
          <Button className="Branch_Btn" onClick={() => openModal("Add")}>
            Add a Reservation <i className="fa fa-plus-circle"></i>
          </Button>
        </div>
        <ModalComponent
          title="Add A Reservation"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setForm={setForm}
          form={form}
          FormContent={FormContent}
          handleCancel={handleCancel}
        />
        {reservations?.map(
          ({
            branchId,
            peopleQty,
            date,
            startTime,
            endTime,
            _id,
            customerName,
            customerId,
          }) => {
            const address = branches?.find(
              ({ _id }) => branchId === _id
            )?.address;
            console.log("in div rendered");

            return (
              // --- New User Reservation Design ---
              <div className="My_Reserve_Box" key={_id}>
                <div className="Reserve_Img_Box">
                  <img src={Reserve_Img} alt="NA" />
                </div>
                <h1>Reservation Confirmed</h1>
                {/* --- Box --- */}
                <div className="Reservation_Detail_Box">
                  <h2>Details : -</h2>
                  {/* - Row - */}
                  <div className="Reservation_Row">
                    {/* Data */}
                    <div className="Reserve_Row_Data">
                      <p className="Reserve_Row_Data_P1">
                        <i class="fa fa-user"></i> People Qty :
                      </p>
                      <p className="Reserve_Row_Data_P2">{peopleQty}</p>
                    </div>
                    {/* Data */}
                    <div className="Reserve_Row_Data">
                      <p className="Reserve_Row_Data_P1">
                        <i class="fa fa-calendar"></i> Date :
                      </p>
                      <p className="Reserve_Row_Data_P2">{date}</p>
                    </div>
                  </div>
                  {/* - Row - */}
                  <div className="Reservation_Row">
                    {/* Data */}
                    <div className="Reserve_Row_Data">
                      <p className="Reserve_Row_Data_P1">
                        <i class="fa fa-clock-o"></i> Start Time :
                      </p>
                      <p className="Reserve_Row_Data_P2">
                        {to24Hour(startTime)}
                      </p>
                    </div>
                    {/* Data */}
                    <div className="Reserve_Row_Data">
                      <p className="Reserve_Row_Data_P1">
                        <i class="fa fa-clock-o"></i> End Time :
                      </p>
                      <p className="Reserve_Row_Data_P2">{to24Hour(endTime)}</p>
                    </div>
                  </div>
                  {/* - Row - */}
                  <div className="Reservation_Row">
                    {/* Data */}
                    <div className="Reserve_Row_Data_S">
                      <p className="Reserve_Row_Data_P1">
                        <i class="fa fa-institution"></i> Address :
                      </p>
                      <p className="Reserve_Row_Data_P_Special">{address}</p>
                    </div>
                  </div>
                  {/* Btn Parent */}
                  <div className="Reserve_Btn_Parent">
                    {/* Btn - 1 */}
                    <Button
                      onClick={() =>
                        updateModal({
                          branchId,
                          peopleQty,
                          date,
                          startTime,
                          endTime,
                          _id,
                          customerName,
                          customerId,
                        })
                      }
                      style={{ backgroundColor: "rgb(27, 27, 255)" }}
                    >
                      Edit <EditOutlined />
                    </Button>
                    {/* Btn - 2 */}
                    <Button onClick={() => deleteReservation(_id, customerId)}>
                      Delete <DeleteOutlined />
                    </Button>
                  </div>
                </div>

                {/* <p>People Qty: {peopleQty}</p>
                <p>Date: {date}</p> */}
                {/* <p>Start Time: {to24Hour(startTime)}</p>
                <p>End Time: {to24Hour(endTime)}</p> */}
                {/* <p>Address: {address}</p> */}

                {/* <Button
                  onClick={() =>
                    updateModal({
                      branchId,
                      peopleQty,
                      date,
                      startTime,
                      endTime,
                      _id,
                      customerName,
                      customerId,
                    })
                  }
                >
                  Edit
                </Button>
                <Button onClick={() => deleteReservation(_id, customerId)}>
                  Delete
                </Button> */}
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

export default Reservation;
