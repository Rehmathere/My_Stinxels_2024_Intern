import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addMenuThunk,
  getMenuThunk,
  updateMenuThunk,
  deleteMenuThunk,
} from "../../../Redux/Thunks/MenuApi";

import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import ModalComponent from "../../ModalComponent/ModalComponent";
import Modal from "./Modal";

// --- Burger Images ---
import Burger_1 from "../../../assets/Menu_Pics/burger1.jpg";
import Burger_2 from "../../../assets/Menu_Pics/burger2.jpg";
import Burger_3 from "../../../assets/Menu_Pics/burger3.jpg";

// CSS
import "./Menu_Admin.scss";

function Menu() {
  // --- Menu Burger Dummy Araray ---
  // Burger API Item
  const burgerData = [
    {
      id: 1,
      name: "Crunch Bruger",
      description: "With Patty With Curunch Sauce & Crispy and Smoke Chiken",
      price: 350,
      image: Burger_1,
    },
    {
      id: 2,
      name: "Jalapeno Burger",
      description: "With Patty With Jalapeno Sauce & Crispy and Smoke Chiken",
      price: 700,
      image: Burger_2,
    },
    {
      id: 2,
      name: "Jalapeno Burger",
      description: "With Patty With Jalapeno Sauce & Crispy and Smoke Chiken",
      price: 700,
      image: Burger_2,
    },
  ];
  // --- Menu Burger Dummy Araray ---

  const dispatch = useDispatch();
  const { Fries, Burger, Chicken, Salads, Drinks, Sauces } = useSelector(
    (state) => state.menuSlice.menu
  );

  const [form] = Form.useForm();
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
    openModal("Update");
  };

  const addMenuItem = (body) => {
    const { dragger } = body;
    const img = dragger[0].thumbUrl;
    delete body["dragger"];
    // console.log({ ...body, img: dragger[0].thumbUrl });
    dispatch(addMenuThunk({ ...body, img }));
  };

  const updateMenuItem = (body) => {
    const { _id } = updateMenuItemObj;

    const img = body.dragger[0]?.thumbUrl;
    delete body["dragger"];
    dispatch(updateMenuThunk({ ...body, _id, img }));
    setUpdateMenuItemObj({});
  };

  const deleteMenuItem = (_id, category) => {
    const deleteParam = new URLSearchParams({
      _id,
      category,
    });
    dispatch(deleteMenuThunk(deleteParam));
  };

  useEffect(() => {
    dispatch(getMenuThunk());
  }, []);

  const setForm = () => {
    const { name, price, category, description, img } = updateMenuItemObj;
    return [
      {
        name: "name",
        value: name,
      },
      {
        name: "category",
        value: category,
      },
      {
        name: "price",
        value: price,
      },
      {
        name: "dragger",
        value: [
          { uid: "-1", name: "image.png", status: "done", thumbUrl: img },
        ],
      },
      {
        name: "description",
        value: description,
      },
    ];
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const FormContent = () => {
    const handleFinish = (body) => {
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

    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <div className="min-h-[80vh] max-w-[100vw]">
        {/* <div> */}
        <h1 className="Branch_H">Menu</h1>
        <div className="Parent_Branch_Btn">
          <Button className="Branch_Btn" onClick={() => openModal("Add")}>
            Add Menu Item <i className="fa fa-plus-circle"></i>
          </Button>
        </div>
        {/* --- New Menu Design --- */}
        {/* <div className="New_Menu_Box">
          <br />
          <h1>Burger</h1>
          <div className="New_Menu_Box_Sub">
            {burgerData.map((item) => (
              <div key={item.id} className="New_Menu_Item_Box">
                <div className="New_Menu_Item_Box_Sub">
                  <div className="New_Menu_Item_Box_Part_1">
                    <img src={item.image} alt="NA" />
                  </div>
                  <div className="New_Menu_Item_Box_Part_2">
                    <h3>{item.name.slice(0, 15)}</h3>
                    <p>{item.description.slice(0, 60)}</p>
                    <h5>{item.price} PKR</h5>
                    <div className="New_Btn_Parent">
                      <button className="New_Btn_1">
                        <i class="fa fa-pencil"></i>
                      </button>
                      <button className="New_Btn_2">
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* --- New Menu Design --- */}
        <Modal
          formArray={formArray}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          addMenuItem={addMenuItem}
          menuMethod={menuMethod}
          updateMenuItem={updateMenuItem}
          updateMenuItemObj={updateMenuItemObj}
        />
        <ModalComponent
          FormContent={FormContent}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          addItem={addMenuItem}
          updateItem={updateMenuItem}
          updateItemObj={updateMenuItemObj}
          method={menuMethod}
          form={form}
          handleCancel={handleCancel}
          setForm={setForm}
        />
        {Chicken.length != 0 && (
          <MenuCategory
            categoryText={"Chicken"}
            menuItemsArray={Chicken}
            updateModal={updateModal}
            deleteMenuItem={deleteMenuItem}
          />
        )}
        {Burger.length != 0 && (
          <MenuCategory
            categoryText={"Burger"}
            menuItemsArray={Burger}
            updateModal={updateModal}
            deleteMenuItem={deleteMenuItem}
          />
        )}
        {Fries.length != 0 && (
          <MenuCategory
            categoryText={"Fries"}
            menuItemsArray={Fries}
            updateModal={updateModal}
            deleteMenuItem={deleteMenuItem}
          />
        )}
        {Salads.length != 0 && (
          <MenuCategory
            categoryText={"Salads"}
            menuItemsArray={Salads}
            updateModal={updateModal}
            deleteMenuItem={deleteMenuItem}
          />
        )}
        {Drinks.length != 0 && (
          <MenuCategory
            categoryText={"Drinks"}
            menuItemsArray={Drinks}
            updateModal={updateModal}
            deleteMenuItem={deleteMenuItem}
          />
        )}
        {Sauces.length != 0 && (
          <MenuCategory
            categoryText={"Sauces"}
            menuItemsArray={Sauces}
            updateModal={updateModal}
            deleteMenuItem={deleteMenuItem}
          />
        )}
      </div>
    </>
  );
}

function MenuCategory({
  categoryText,
  menuItemsArray,
  updateModal,
  deleteMenuItem,
}) {
  return (
    <>
      <div className="New_Menu_Box">
        <br />
        <h1>{categoryText}</h1>
        <div className="New_Menu_Box_Sub">
          {menuItemsArray?.map(
            ({ description, name, price, img, _id, category }) => (
              <MenuItem
                description={description}
                name={name}
                price={price}
                img={img}
                _id={_id}
                category={category}
                updateModal={updateModal}
                deleteMenuItem={deleteMenuItem}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

function MenuItem({
  description,
  name,
  price,
  img,
  _id,
  category,
  updateModal,
  deleteMenuItem,
}) {
  return (
    <>
      <div className="New_Menu_Item_Box">
        <div className="New_Menu_Item_Box_Sub">
          <div className="New_Menu_Item_Box_Part_1">
            <img src={img} alt="NA" />
          </div>
          <div className="New_Menu_Item_Box_Part_2">
            <h3>{name}</h3>
            <p>{description}</p>
            <h5>{price} PKR</h5>
            <div className="New_Btn_Parent">
              <button
                onClick={() =>
                  updateModal({ price, category, name, description, _id, img })
                }
                className="New_Btn_1"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button
                onClick={() => deleteMenuItem(_id, category)}
                className="New_Btn_2"
              >
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
