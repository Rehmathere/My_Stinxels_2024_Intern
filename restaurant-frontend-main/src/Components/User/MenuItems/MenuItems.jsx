import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { getMenuThunk } from "../../../Redux/Thunks/MenuApi";
import { addToCart } from "../../../Redux/Slices/UserSlice";

import "../../Home/home";

function MenuItems() {
  // Chicken API Item
  const dispatch = useDispatch();
  const { Fries, Burger, Chicken, Salads, Drinks, Sauces } = useSelector(
    (state) => state.menuSlice.menu
  );

  useEffect(() => {
    dispatch(getMenuThunk());
  }, []);
  return (
    <>
      {Chicken.length != 0 && (
        <MenuItem categoryText={"Chicken"} ItemArray={Chicken} />
      )}
      {Burger.length != 0 && (
        <MenuItem categoryText={"Burger"} ItemArray={Burger} />
      )}

      {Fries.length != 0 && (
        <MenuItem categoryText={"Fries"} ItemArray={Fries} />
      )}

      {Salads.length != 0 && (
        <MenuItem categoryText={"Salads"} ItemArray={Salads} />
      )}
      {Drinks.length != 0 && (
        <MenuItem categoryText={"Drinks"} ItemArray={Drinks} />
      )}
      {Sauces.length != 0 && (
        <MenuItem categoryText={"Sauces"} ItemArray={Sauces} />
      )}
    </>
  );
}

function MenuItem({ categoryText, ItemArray }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.userSlice.cart);
  console.log(cart);

  const addItem = (body) => {
    const { category, _id } = body;
    // console.log({ category, _id });

    dispatch(addToCart({ category, _id }));
  };
  return (
    <>
      <h1 className="text-3xl font-bold my-7">{categoryText}</h1>
      <div className="grid grid-cols-12 gap-2">
        {" "}
        {/*class name Menu_Box*/}
        <div className=" col-span-12 lg:col-span-4 md:col-span-6 sm:col-span-6 hover:scale-105 transition-transform duration-300">
          {" "}
          {/*class name Menu_Box_Sub*/}
          <ItemCards />
        </div>
      </div>
    </>
  );
}

function ItemCards() {
  const [qty, setQty] = useState(0);
  const [show, setShow] = useState(false);

  const handleAnimation = () => {
    setShow(true); // Trigger animation

    // Hide the animation after 500ms
    setTimeout(() => setShow(false), 500);
  };

  const handleAdd = () => {
    setQty(qty + 1);
    handleAnimation();
  };

  return (
    <>
      <div className="  grid grid-cols-12  border-2 border-gray-200 rounded-md p-1 ">
        <div className=" col-span-6 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold lg:text-lg">Paneer Makhni</h5>
            <p className="text-gray-500 text-xs text-left  ">
              Paneer Makhni Paneer Makhni Paneer Makhni Paneer Makhni Paneer
              Makhni
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-green-400">1299</p>
            <Svg />
          </div>
        </div>
        <div className="flex items-center justify-end col-span-6">
          <div className="relative w-[174px] h-[116px] overflow-hidden">
            <img
              className="rounded-md w-full object-cover"
              src="https://imageproxy.wolt.com/menu/menu-images/5f71921263a6ac41b4e98c3c/8f2cae5a-67a5-11eb-aa3c-46efe57ab807__mann_o_salwa_45.jpeg?w=200"
              alt=""
            />
            {qty == 0 ? (
              <div
                onClick={handleAdd}
                className="absolute top-0 right-0 h-[44px] w-[46px] flex justify-center items-center bg-green-100 hover:bg-green-200 rounded-l-lg"
              >
                <FaPlus color="green" />
              </div>
            ) : (
              <div className="absolute top-0 right-0 h-[44px] max-w-[140px] w-full flex justify-center items-center gap-6 p-2 bg-green-100 hover:bg-green-200 rounded-l-lg">
                <div
                  onClick={() => setQty(qty - 1)}
                  className="w-[32px] h-[32px] bg-white flex justify-center items-center rounded-full"
                >
                  <FaMinus color="green" />
                </div>
                <p className="relative text-green-950 font-semibold">
                  {qty}{" "}
                  {show && (
                    <span
                      className={`absolute text-xl font-bold text-blue-500 
          transition-transform duration-500 transform 
          ${show ? "opacity-100 -translate-y-10" : "opacity-0 translate-y-5"}`}
                    >
                      +1
                    </span>
                  )}
                </p>
                <div
                  onClick={() => setQty(qty + 1)}
                  className="w-[32px] h-[32px] bg-white flex justify-center items-center rounded-full"
                >
                  <FaPlus color="green" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuItems;

function SvgPlus() {
  return (
    <svg viewBox="0 0 24 24" class="i1fd8v5j">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 12a1.5 1.5 0 001.5 1.5h8.75a.25.25 0 01.25.25v8.75a1.5 1.5 0 003 0v-8.75a.25.25 0 01.25-.25h8.75a1.5 1.5 0 000-3h-8.75a.25.25 0 01-.25-.25V1.5a1.5 1.5 0 00-3 0v8.75a.25.25 0 01-.25.25H1.5A1.5 1.5 0 000 12z"
      ></path>
    </svg>
  );
}

function Svg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="rgba(0, 155, 85, 0.64)"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Halal"
      width="12"
    >
      <g clip-path="url(#halal_svg__a)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 11.96c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12s-12 5.372-12 12Zm9.035-4.766a.794.794 0 1 0-1.588 0v6.035c0 1.058-.72 1.618-1.436 1.618-.255 0-.602-.13-.892-.392-.285-.259-.432-.567-.432-.846v-.002c0-.365.122-.72.347-1.009a.794.794 0 1 0-1.25-.977 3.223 3.223 0 0 0-.684 1.988c0 .835.425 1.544.954 2.023.525.474 1.237.803 1.957.803 1.612 0 3.024-1.291 3.024-3.206V7.194Zm1.521 1.527a.794.794 0 0 0-.526 1.498h.002l.012.005.051.019.195.074c.165.066.389.159.625.27a.794.794 0 0 0 .676-1.437 12.492 12.492 0 0 0-1.008-.42l-.019-.006-.005-.002h-.002Zm3.228-1.802a.794.794 0 0 1 .81.76c.116 2.82.219 4.588.47 5.66.125.531.263.777.366.887.067.072.15.126.37.126 1.242 0 2.24-.45 2.94-.913.182-.12.342-.24.479-.352-.216-.216-.394-.423-.54-.591a8.025 8.025 0 0 0-.215-.244c-.152-.162-.263-.25-.372-.306-.1-.05-.242-.095-.482-.095-.459 0-.588.159-.627.213a.426.426 0 0 0-.072.155.794.794 0 0 1-1.578-.163l.79.07c-.79-.07-.79-.072-.79-.072v-.007l.002-.01.003-.027a1.619 1.619 0 0 1 .063-.283c.05-.165.14-.385.305-.608.356-.48.97-.855 1.904-.855.457 0 .85.089 1.201.267.343.174.6.41.809.633.13.139.243.269.351.394.26.3.492.568.89.855a.794.794 0 0 1 .148 1.148l-.613-.504.613.505h-.002l-.002.004-.007.009-.022.025a5.839 5.839 0 0 1-.346.358 7.434 7.434 0 0 1-1.014.805c-.879.582-2.179 1.176-3.816 1.176-.574 0-1.11-.178-1.53-.63-.385-.412-.604-.98-.751-1.608a9.73 9.73 0 0 1-.136-.707c-.08.153-.164.301-.25.444-.823 1.379-1.823 2.272-2.484 2.858a.794.794 0 0 1-1.053-1.187c.647-.575 1.486-1.331 2.174-2.484.683-1.143 1.236-2.71 1.236-4.912 0-.432.346-.785.777-.794Z"
        ></path>
      </g>
      <defs>
        <clipPath id="halal_svg__a">
          <path d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
{
  /* <div className="Menu_Box">
        <h1>{categoryText}</h1>
        <div className="Menu_Box_Sub">
          
          {ItemArray?.map((item) => (
            <div key={item.id} className="Menu_Item_Box">
              <div className="Menu_Item_Box_Sub">
                <div className="Menu_Item_Box_Sub_Part1">
                  <p className="Menu_Item_P1">{item.name}</p>
                  <span>{item.description}</span>
                  <p className="Menu_Item_P2">PKR {item.price}</p>
                </div>
                <div className="Menu_Item_Box_Sub_Part2">
                  <img src={item.img} alt={item.name} />
                </div>
                <button onClick={() => addItem(item)}>
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */
}
