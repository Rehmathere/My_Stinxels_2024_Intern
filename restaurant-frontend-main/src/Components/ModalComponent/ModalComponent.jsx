import React, { useEffect } from "react";
import { Modal } from "antd";
function ModalComponent({
  isModalOpen,
  setIsModalOpen,
  updateItem,
  method,
  addItem,
  updateItemObj,
  FormContent,
  form,
  handleCancel,
  setForm,
}) {
  useEffect(() => {
    form.setFields([...setForm()]);
  }, [isModalOpen]);
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <FormContent />
      </Modal>
    </>
  );
}

export default ModalComponent;
