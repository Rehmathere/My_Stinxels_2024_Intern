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
  title,
}) {
  useEffect(() => {
    form.setFields([...setForm()]);
  }, [isModalOpen]);
  return (
    <>
      <Modal
        // title="Basic Modal"
        // --- I Provided Dynamic Title ---
        title={
          <div
            style={{
              textAlign: "center",
              padding: "10px 0px",
              letterSpacing: "1px",
            }}
          >
            {title}
          </div>
        }
        // --- I Provided Dynamic Title ---
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
