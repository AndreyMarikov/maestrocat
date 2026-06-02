import { useRef, useState } from "react";
import FlagOfRussia from "../assets/Flag_of_Russia.svg";
import FlagOfUK from "../assets/Flag_of_UK.svg";
import { useSearchParams } from "react-router-dom";
import EnglishOption from "./EnglishOption";
import RussianOption from "./RussianOption";

function Dropdown() {
  const dropDownMenuRef = useRef(null);
  const caretIconRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const language = searchParams.get('lang');

  function openMenu() {
    dropDownMenuRef.current.style.visibility = "visible";
    dropDownMenuRef.current.style.rotate = "x 0deg";
    dropDownMenuRef.current.style.opacity = 1;
    caretIconRef.current.style.transform = "rotate(-180deg)";
    setOpen(true);
  }

  function closeMenu() {
    dropDownMenuRef.current.style.opacity = 0;
    dropDownMenuRef.current.style.rotate = "x 90deg";
    caretIconRef.current.style.transform = "rotate(0deg)";
    setTimeout(() => {
      dropDownMenuRef.current.style.visibility = "hidden";
    }, 200);
    setOpen(false);
  }

  return (
    <>
      <style>
        {`
          .dropdown {
            position: fixed;
            top: 0;
            right: 0;
          }

          .dropdown-button {
            padding: 16px;
            font-size: 20px;
            color: hsl(0, 0%, 25%);
            display: flex;
            gap: 8px;
            align-items: center;
            background: transparent;
          }

          .bi-caret-down-fill {
            transition: transform 0.2s;
          }
          
          .flag {
            max-width: 30px;
            height: 20px;
            object-fit: cover;
            object-position: center;
            border-radius: 4px;
          }

          .option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 16px;
            font-size: 20px;
          }

          .option:first-child {
            padding-bottom: 12px;
          }

          .option:last-child {
            padding-top: 12px;
            border-top: 3px solid hsl(0, 0%, 85%);
          }

          .dropdown-menu {
            position: fixed;
            top: -4px;
            right: 16px;
            background: var(--white);
            display: flex;
            flex-direction: column;
            border-radius: 16px;
            outline: 3px solid hsl(0, 0%, 85%);
            transition: 0.2s opacity, transform 0.2s, rotate 0.2s;
            transform: translateY(calc(50% + 12px));
            rotate: x 90deg;
          }

          .dropdown-menu::before {
            content: "";
            background: var(--white);
            width: 16px;
            height: 16px;
            transform: rotate(45deg);
            position: absolute;
            top: -11px;
            right: 19px;
            border-top: 3px solid hsl(0, 0%, 85%);
            border-left: 3px solid hsl(0, 0%, 85%);
          }
        `}
      </style>
      <div className='dropdown'>
        <button className="dropdown-button" onFocus={openMenu} onBlur={closeMenu}>
          <img src={language == "russian" ? FlagOfRussia : FlagOfUK} className='flag'></img>
          <p style={{ fontFamily: "Rubik" }}>{language == "russian" ? "Русский" : "English"}</p>
          <i ref={caretIconRef} className='bi bi-caret-down-fill' style={{ fontSize: 16 + "px" }}></i>
        </button>
        <div ref={dropDownMenuRef} className='dropdown-menu' style={{ opacity: 0 }}>
          <EnglishOption />
          <RussianOption />
        </div>
      </div>
    </>
  );
}

export default Dropdown;
