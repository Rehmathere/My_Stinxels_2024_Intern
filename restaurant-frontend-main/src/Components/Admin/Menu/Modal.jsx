import React, { useEffect } from "react";
import { Modal as AntdModal, Form, Input, Select, Upload } from "antd";

import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

function Modal({
  formArray,
  isModalOpen,
  setIsModalOpen,
  addMenuItem,
  updateMenuItem,
  menuMethod,

  updateMenuItemObj,
  ModalForm,
}) {
  console.log(menuMethod);

  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleFinish = (body) => {
    console.log(body);

    const menuActions = {
      Add: () => addMenuItem(body),
      Update: () => updateMenuItem(body),
    };
    menuActions[menuMethod]();
    form.resetFields();
    setIsModalOpen(false);
  };

  const categoryOptions = [
    { value: "Chicken", label: "Chicken" },
    { value: "Burger", label: "Burger" },
    { value: "Fries", label: "Fries" },
    { value: "Salads", label: "Salads" },
    { value: "Drinks", label: "Drinks" },
    { value: "Sauces", label: "Chicken" },
  ];

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    const { name, price, category, description, img } = updateMenuItemObj;
    console.log(updateMenuItemObj, "updateMenuItemObj");
    console.log(category?.value, "category value");

    form.setFields([
      {
        name: formArray[0],
        value: name,
      },
      {
        name: formArray[1],
        value: category,
      },
      {
        name: formArray[2],
        value: price,
      },
      {
        name: "dragger",
        value: [
          { uid: "-1", name: "image.png", status: "done", thumbUrl: img },
        ],
      },
      {
        name: formArray[3],
        value: description,
      },
    ]);
  }, [updateMenuItemObj]);

  return (
    <>
      <AntdModal
        title={`${menuMethod} Menu Item`}
        open={isModalOpen}
        okText={menuMethod}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form onFinish={handleFinish} form={form} layout="vertical">
          <Form.Item label="Name" name={"name"}>
            <Input placeholder={"Enter Name"}></Input>
          </Form.Item>
          <Form.Item label="Price" name={"price"}>
            <Input placeholder={"Enter Price"} type="number"></Input>
          </Form.Item>
          <Form.Item label="Category" name={"category"}>
            <Select
              allowClear
              options={categoryOptions}
              placeholder="select Category"
            />
          </Form.Item>
          <Form.Item label="Description" name={"description"}>
            <Input placeholder={"Enter Description"}></Input>
          </Form.Item>

          <Form.Item label="Image">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger maxCount={1} name="files" listType="picture">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag Image to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
      </AntdModal>
      {/* <ModalForm /> */}
    </>
  );
}

export default Modal;
