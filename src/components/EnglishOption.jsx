import FlagOfUK from "../assets/Flag_of_UK.svg";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function EnglishOption() {
  const [searchParams, setSearchParams] = useSearchParams();
  const optionRef = useRef(null);

  useEffect(() => {
    const option = optionRef.current;

    function setLanguageToEnglish() {
      localStorage.setItem("lang", "english");
      setSearchParams({ lang: "english" }, { replace: true });
    }

    option.addEventListener("pointerdown", setLanguageToEnglish);

    return () => {
      option.removeEventListener("pointerdown", setLanguageToEnglish);
    };
  }, []);

  return (
    <div ref={optionRef} className='option'>
      <img src={FlagOfUK} className='flag'></img>
      <p>English</p>
    </div>
  );
}

export default EnglishOption;
