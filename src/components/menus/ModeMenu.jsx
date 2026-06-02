import { Link, useSearchParams } from 'react-router-dom';
import ExitButton from "../ExitButton";
import TurnYourDeviceMessage from "../TurnYourDeviceMessageLandscape";
import Dropdown from '../Dropdown';
import { useEffect } from 'react';

export default function ModeMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const octave = searchParams.get('octave');
  const language = searchParams.get('lang');

  useEffect(() => {
    searchParams.set("lang", localStorage.getItem("lang"));
    setSearchParams(searchParams, { replace: true });
  }, []);

  const getPath = (queryString) => {
    let path;

    if (octave == 'great') {
      path = '/great-octave';
    } else if (octave == 'small') {
      path = '/small-octave';
    } else if (octave == 'two-line') {
      path = '/two-line-octave';
    } else {
      path = '/one-line-octave';
    }

    if (queryString) {
      return path + queryString;
    }

    return path;
  }

  return (
    <>
      <style>
        {`
          #root {
            justify-content: end !important;
          }

          @media (min-height: 750px) {
            h1 {
              position: static;
              margin-top: 0;
            }
          }
        `}
      </style>
      <TurnYourDeviceMessage />
      <Dropdown />
      <span className="center" id="menu-btns">
        <h1>{language == "russian" ? "Выберите режим" : "Choose mode"}</h1>
        <Link to={'/note-notation?octave=' + octave + "&lang=" + language} className="btn btn-orange btn-menu"><span style={{ position: "absolute", left: 24 + "px", alignSelf: "center" }}>
          <i class="fa-solid fa-stopwatch"></i>
          <div style={{ height: 100 + "%", borderLeft: "2.5px solid var(--white)", borderRight: "2.5px solid var(--orange50)", position: "absolute", top: 0, left: 50 + "%", translate: "-50% 1.5px", rotate: -45 + "deg" }}></div>
        </span>{language == "russian" ? "Разминка" : "Untimed"}<div></div></Link>
        <Link to={{
          pathname: '/mode/note-reading',
          search: octave && '?octave=' + octave + "&lang=" + language,
        }} className="btn btn-red btn-menu"><i className='fa-solid fa-stopwatch' style={{ position: "absolute", left: 24 + "px", alignSelf: "center" }}></i>{language == "russian" ? "На время" : "Timed"}<div></div></Link>
        <ExitButton />
      </span>
    </>
  );
}
