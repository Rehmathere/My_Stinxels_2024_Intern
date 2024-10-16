import React, { useEffect, useState } from "react";
import ModalComponent from "../../ModalComponent/ModalComponent";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, Form, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addBranchThunk,
  getBranchThunk,
  updateBranchThunk,
  deleteBranchThunk,
} from "../../../Redux/Thunks/BranchApi";

function Branch() {
  const [form] = Form.useForm();
  const branches = useSelector((state) => state.branchSlice?.branches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateBranchObj, setUpdateBranchObj] = useState({});
  const [branchMethod, setBranchMethod] = useState("");
  const dispatch = useDispatch();

  const addBranch = (body) => {
    dispatch(addBranchThunk(body));
  };

  const updateBranch = (body) => {
    const { _id } = updateBranchObj;
    body = { ...body, _id };
    dispatch(updateBranchThunk(body));
    // console.log("updated branch body", body);
  };
  const deleteBranch = (_id) => {
    const deleteParam = new URLSearchParams({
      _id,
    });
    dispatch(deleteBranchThunk(deleteParam));
  };

  const openModal = (branchMethodText) => {
    setIsModalOpen(true);
    setBranchMethod(branchMethodText);
  };

  const updateModal = (menuItemObj) => {
    setUpdateBranchObj({ ...menuItemObj });
    openModal("Update");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdateBranchObj({});
    form.resetFields();
  };

  useEffect(() => {
    dispatch(getBranchThunk());
  }, []);

  const setForm = () => {
    const { address, contactNum, tables } = updateBranchObj;
    console.log(updateBranchObj);

    return [
      {
        name: "contactNum",
        value: contactNum,
      },
      {
        name: "address",
        value: address,
      },
      {
        name: "tables",
        value: tables,
      },
    ];
  };

  const FormContent = () => {
    const handleFinish = (body) => {
      console.log("branchMethod", branchMethod);
      console.log(body);

      const menuActions = {
        Add: () => addBranch(body),
        Update: () => updateBranch(body),
      };
      menuActions[branchMethod]();
      form.resetFields();
      setIsModalOpen(false);
    };
    return (
      <>
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name={"contactNum"} label="Contact Number">
            <PhoneInput country={"pk"} />
          </Form.Item>
          <Form.Item name={"address"} label="Address">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Tables">
            <Form.List name={["tables"]}>
              {(subFields, subOpt) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  {subFields.map((subField) => (
                    <Space key={subField.key}>
                      <Form.Item noStyle name={[subField.name, "seatingSize"]}>
                        <Input placeholder="Enter Seating Size" type="number" />
                      </Form.Item>
                      <Form.Item noStyle name={[subField.name, "qty"]}>
                        <Input
                          placeholder="Enter Quantity of Table"
                          type="number"
                        />
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => subOpt.add()} block>
                    + Add Another Table
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </>
    );
  };

  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNum",
      key: "contactNum",
    },
    {
      title: "Tables",
      align: "center",
      dataIndex: "tables",
      key: "tables",
      render: (_, record) => (
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-around">
            <Button ghost type="link">
              Seating Size
            </Button>
            <Button ghost type="link">
              Table Qty
            </Button>
          </div>
          <div className="w-full">
            {record?.tables?.map((item, index) => (
              <>
                <Space key={index} className="flex justify-around w-full ">
                  <p>{item?.seatingSize}</p>
                  <p>{item?.qty}</p>
                </Space>
                <br />
              </>
            ))}
          </div>
        </div>
      ),
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
            onClick={() => deleteBranch(record._id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];
  // --- Dummy Table Data ---
  const dummyData = [
    {
      address: "asdadsadsd",
      contactNum: "23334454",
      tables: [{ seatingSize: "2", qty: "10" }],
    },
  ];
  // --- Dummy Table Data ---

  return (
    <>
      <Button onClick={() => openModal("Add")}>Add Branch</Button>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCancel={handleCancel}
        form={form}
        FormContent={FormContent}
        setForm={setForm}
      />
      <Table dataSource={dummyData} columns={columns} />;
    </>
  );
}

export default Branch;
