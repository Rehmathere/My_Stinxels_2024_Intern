import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalComponent from "../../ModalComponent/ModalComponent";
import {
  getMenuCategoryThunk,
  updateMenuCategoryThunk,
  deleteMenuCategoryThunk,
  addMenuCategoryThunk,
} from "../../../Redux/Thunks/MenuCategoryApi";
import { CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Table } from "antd";

function MenuCategory() {
  const menuCategory = useSelector(
    (state) => state.menuCategorySlice.menuCategory
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCategoryObj, setupdateCategoryObj] = useState({});
  const [categoryMethod, setcategoryMethod] = useState("");

  useEffect(() => {
    dispatch(getMenuCategoryThunk());
  }, []);

  const addCategory = (body) => {
    dispatch(addMenuCategoryThunk(body));
  };

  const updateMenuCategory = (body) => {
    const { _id } = updateCategoryObj;
    body = { ...body, _id };
    dispatch(updateMenuCategoryThunk(body));
  };

  const deleteBranch = (_id) => {
    const deleteParam = new URLSearchParams({
      _id,
    });
    dispatch(deleteMenuCategoryThunk(deleteParam));
  };

  const openModal = (categoryMethodText) => {
    setIsModalOpen(true);
    setcategoryMethod(categoryMethodText);
  };

  const updateModal = (menuItemObj) => {
    setupdateCategoryObj({ ...menuItemObj });
    openModal("Update");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setupdateCategoryObj({});
    form.resetFields();
  };

  const setForm = () => {
    const { category } = updateCategoryObj;
    return [{ name: "category", value: category }];
  };

  const FormContent = () => {
    const handleFinish = (body) => {
      const categoryActions = {
        Add: () => addCategory(body),
        Update: () => updateMenuCategory(body),
      };
      categoryActions[categoryMethod]();
      form.resetFields();
      setIsModalOpen(false);
    };
    return (
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name={"category"}
          label="Category"
          rules={[
            { required: true, message: "Please Enter a Category" },
            {
              pattern: new RegExp(/^[a-zA-Z]+(-[a-zA-Z]+)*$/),
              message: "Category must not contain any special characters ",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
      </Form>
    );
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
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

  return (
    <>
      <div className="min-h-[80vh] max-w-[100vw]">
        <h1 className="Branch_H">Category</h1>
        <div className="Parent_Branch_Btn">
          <Button className="Branch_Btn" onClick={() => openModal("Add")}>
            Add Category <i className="fa fa-plus-circle"></i>
          </Button>
        </div>
        <ModalComponent
          title="Add a Category"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCancel={handleCancel}
          form={form}
          FormContent={FormContent}
          setForm={setForm}
        />
        <Table
          dataSource={menuCategory}
          columns={columns}
          rowClassName="custom-table-row"
        />
      </div>
    </>
  );
}

export default MenuCategory;
