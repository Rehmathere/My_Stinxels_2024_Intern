import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addMenuThunk,
  getMenuThunk,
  updateMenuThunk,
  deleteMenuThunk,
} from "../../Redux/Thunks/MenuApi";
import Modal from "../Modal";
function Menu() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuSlice.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuMethod, setMenuMethod] = useState("");
  const [updateMenuItemObj, setUpdateMenuItemObj] = useState({});

  const [formArray, setFormArray] = useState([
    "name",
    "category",
    "price",
    "description",
  ]);

  const openModal = (menuMethodText) => {
    setIsModalOpen(true);
    setMenuMethod(menuMethodText);
  };

  const updateModal = (menuItemObj) => {
    setUpdateMenuItemObj({ ...menuItemObj });
    openModal("update");
  };

  const addMenuItem = (body) => {
    console.log(body);
    dispatch(addMenuThunk(body));
  };

  const updateMenuItem = (body) => {
    const { _id } = updateMenuItemObj;
    dispatch(updateMenuThunk({ ...body, _id }));
    setUpdateMenuItemObj({});
  };

  const deleteMenuItem = (_id) => {
    const deleteParam = new URLSearchParams({
      _id: _id,
    });
    dispatch(deleteMenuThunk(deleteParam));
  };
  console.log(menu);

  useEffect(() => {
    dispatch(getMenuThunk());
  }, []);
  return (
    <>
      <div className="h-screen max-w-[100vw]">
        <Button onClick={() => openModal("add")}>Add Menu Item</Button>
        <Modal
          formArray={formArray}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          addMenuItem={addMenuItem}
          menuMethod={menuMethod}
          updateMenuItem={updateMenuItem}
          updateMenuItemObj={updateMenuItemObj}
        />
        {menu?.map(({ price, category, name, description, _id }) => (
          <Card title={name} bordered={false} style={{ width: 300 }}>
            <p>Category {category}</p>
            <p>price {price}</p>
            <p>description {description}</p>
            <Button
              onClick={() =>
                updateModal({ price, category, name, description, _id })
              }
            >
              Update
            </Button>
            <Button onClick={() => deleteMenuItem(_id)}>Delete</Button>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Menu;
