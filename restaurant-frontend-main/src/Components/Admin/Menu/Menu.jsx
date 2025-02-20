import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addMenuThunk,
  getMenuThunk,
  updateMenuThunk,
  deleteMenuThunk,
} from "../../../Redux/Thunks/MenuApi";
import { getMenuCategoryThunk } from "../../../Redux/Thunks/MenuCategoryApi";

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
  const menu = useSelector((state) => state.menuSlice.menu);
  const menuCategory = useSelector(
    (state) => state.menuCategorySlice.menuCategory
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
    // console.log(body);

    dispatch(addMenuThunk({ ...body, img }));
  };

  const updateMenuItem = (body) => {
    const { _id } = updateMenuItemObj;

    const img = body.dragger[0]?.thumbUrl;
    delete body["dragger"];
    console.log(body, "update item body");

    dispatch(updateMenuThunk({ ...body, _id, img }));
    setUpdateMenuItemObj({});
  };

  const deleteMenuItem = (_id, categoryId) => {
    console.log("categorruId", category);

    const deleteParam = new URLSearchParams({
      _id,
      categoryId,
    });
    dispatch(deleteMenuThunk(deleteParam));
  };

  useEffect(() => {
    dispatch(getMenuThunk());
    dispatch(getMenuCategoryThunk());
  }, []);

  const setForm = () => {
    const { name, price, categoryId, description, img } = updateMenuItemObj;

    return [
      {
        name: "name",
        value: name,
      },
      {
        name: "categoryId",
        value: categoryId,
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

    const normFile = (e) => {
      console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    return (
      <>
        <Form
          onFinish={handleFinish}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Name"
            name={"name"}
            rules={[{ required: true, message: "Please enter a menu name" }]}
          >
            <Input placeholder={"Enter Name"}></Input>
          </Form.Item>
          <Form.Item
            label="Price"
            name={"price"}
            rules={[
              { required: true, message: "Please enter a menu price" },
              {
                validator: (_, value) => {
                  if (value <= 0) {
                    return Promise.reject(
                      new Error("Value must be greater than 0 ")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder={"Enter Price"} type="number"></Input>
          </Form.Item>
          <Form.Item
            label="Category"
            name={"categoryId"}
            rules={[
              { required: true, message: "Please select a menu category" },
            ]}
          >
            <Select
              allowClear
              options={menuCategory?.map(({ _id, category }) => ({
                value: _id,
                label: category,
              }))}
              placeholder="select Category"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            rules={[
              { required: true, message: "Please enter a menu description" },
            ]}
          >
            <Input placeholder={"Enter Description"}></Input>
          </Form.Item>

          <Form.Item label="Image">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[{ required: true, message: "Please select an image" }]}
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
        {menuCategory?.map(({ _id, category }) => (
          <>
            {!!menu[_id] && menu[_id]?.length != 0 && (
              <MenuCategory
                categoryText={category}
                menuItemsArray={menu[_id]}
                updateModal={updateModal}
                deleteMenuItem={deleteMenuItem}
              />
            )}
          </>
        ))}
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
            ({ description, name, price, img, _id, categoryId }) => (
              <MenuItem
                description={description}
                name={name}
                price={price}
                img={img}
                _id={_id}
                categoryId={categoryId}
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
  categoryId,
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
                  updateModal({
                    price,
                    categoryId,
                    name,
                    description,
                    _id,
                    img,
                  })
                }
                className="New_Btn_1"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button
                onClick={() => deleteMenuItem(_id, categoryId)}
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
