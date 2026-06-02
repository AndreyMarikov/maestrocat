import { useSearchParams } from "react-router-dom";
import FlagOfRussia from "../assets/Flag_of_Russia.svg";
import { useEffect, useRef } from "react";

function RussianOption() {
  const optionRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const option = optionRef.current;

    function setLanguageToRussian() {
      localStorage.setItem("lang", "russian");
      setSearchParams({ lang: "russian" }, { replace: true });
    }

    option.addEventListener("pointerdown", setLanguageToRussian);

    return () => {
      option.removeEventListener("pointerdown", setLanguageToRussian);
    };
  }, []);

  return (
    <div ref={optionRef} className='option'>
      <img src={FlagOfRussia} className='flag'></img>
      <p>Русский</p>
    </div>
  );
}

export default RussianOption;
