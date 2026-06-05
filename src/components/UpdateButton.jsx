import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function UpdateButton() {
  const btnRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const language = searchParams.get('lang');

  useEffect(() => {
    const button = btnRef.current;

    function updateApp() {
      window.location.href = "https://andreymarikov.github.io/maestrocat/" + "?update=" + Date.now();
    }

    button.addEventListener("click", updateApp);

    return () => {
      button.removeEventListener("click", updateApp);
    };
  }, []);

  return <button ref={btnRef} className="update-btn btn btn-menu btn-secondary">{language == "russian" ? "Обновить сейчас" : "Update now"}</button>;
}

export default UpdateButton;
