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
// --- Burger Images ---
import Burger_1 from "../../assets/Menu_Pics/burger1.jpg";
import Burger_2 from "../../assets/Menu_Pics/burger2.jpg";
import Burger_3 from "../../assets/Menu_Pics/burger3.jpg";
// CSS
import "./Menu_Admin.scss"

function Menu() {
  // --- Menu Burger Dummy Araray ---
  // Burger API Item
  const burgerData = [
    {
      id: 1,
      name: "Crunch Bruger",
      description: "Soft , Juicy Chicken",
      price: 350,
      image: Burger_1,
    },
    {
      id: 2,
      name: "Jalapeno Burger",
      description: "With Tender Chicken Fillet",
      price: 750,
      image: Burger_2,
    },
  ];
  // --- Menu Burger Dummy Araray ---
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
        {/* --- Dummy Menu Card Design --- */}
        {/* Box */}
        <div className="Menu_Box">
          <br />
          <h1>Burger</h1>
          <div className="Menu_Box_Sub">
            {/* Item */}
            {burgerData &&
              burgerData.map((item) => (
                <div key={item.id} className="Menu_Item_Box">
                  <div className="Menu_Item_Box_Sub">
                    <div className="Menu_Item_Box_Sub_Part1">
                      <p className="Menu_Item_P1">{item.name}</p>
                      <span>{item.description}</span>
                      <p className="Menu_Item_P2">PKR {item.price}</p>
                    </div>
                    <div className="Menu_Item_Box_Sub_Part2">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="Menu_Item_Box_Part_2_Btn_Parent">
                      <button className="P2_Btn_2"><i class="fa fa-pencil"></i></button>
                      <button className="P2_Btn_1"><i class="fa fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
