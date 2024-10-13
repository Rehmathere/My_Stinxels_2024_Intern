import React, { useEffect } from "react";
import { Modal as AntdModal, Form, Input } from "antd";

function Modal({
  formArray,
  isModalOpen,
  setIsModalOpen,
  addMenuItem,
  updateMenuItem,
  menuMethod,

  updateMenuItemObj,
}) {
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleFinish = (body) => {
    const menuActions = {
      add: () => addMenuItem(body),
      update: () => updateMenuItem(body),
    };
    menuActions[menuMethod]();
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const { name, price, category, description } = updateMenuItemObj;
    console.log(updateMenuItemObj, "updateMenuItemObj");

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
        name: formArray[3],
        value: description,
      },
    ]);
  }, [updateMenuItemObj]);

  return (
    <>
      <AntdModal
        title="Basic Modal"
        open={isModalOpen}
        okText={menuMethod}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form onFinish={handleFinish} form={form}>
          {formArray?.map((item) => (
            <Form.Item name={item}>
              <Input placeholder={item}></Input>
            </Form.Item>
          ))}
        </Form>
      </AntdModal>
    </>
  );
}

export default Modal;
