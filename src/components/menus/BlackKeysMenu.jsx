import { Link, useSearchParams } from 'react-router-dom';
import ExitButton from "../ExitButton";
import TurnYourDeviceMessage from "../TurnYourDeviceMessageLandscape";
import Dropdown from '../Dropdown';
import { useEffect } from 'react';

export default function BlackKeysMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const octave = searchParams.get('octave');
  const language = searchParams.get('lang');

  useEffect(() => {
    searchParams.set("lang", localStorage.getItem("lang"));
    setSearchParams(searchParams, { replace: true });
  }, []);

  const getPath = () => {
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

    return path;
  }

  return (
    <>
      <style>
        {`
          #root {
            justify-content: end !important;
          }

          @media (max-height: 670px) {
            body{
              background-image: none;
            }

            h1 {
              top: 64px !important;
            }
          }
          
          @media (max-height: 625px) {
            h1 {
              top: 32px !important;
            }
          }
          
          @media (max-height: 600px) {
            h1 {
              top: 16px !important;
            }
          }

          @media (min-height: 750px) {
            h1 {
              position: static;
              margin-top: 0;
              margin-bottom: 32px !important;
            }
          }
        `}
      </style>
      <TurnYourDeviceMessage />
      <Dropdown />
      <span className="center" id="menu-btns">
        <h1 style={{ margin: 0, top: 86 + "px" }}>{language == "russian" ? "Чёрные клавиши" : "Black keys"}</h1>
        <Link to={{
          pathname: getPath(),
          search: '?mode=with-sharps&lang=' + language,
        }} className="btn btn-cyan btn-menu"><p style={{ position: "absolute" }}>♯</p>{language == "russian" ? "Диезы" : "Sharps"}</Link>
        <Link to={{
          pathname: getPath(),
          search: '?mode=with-flats&lang=' + language,
        }} className="btn btn-purple btn-menu"><p style={{ position: "absolute", fontSize: 28 + "px" }}>♭</p>{language == "russian" ? "Бемоли" : "Flats"}</Link>
        <Link to={{
          pathname: getPath(),
          search: '?mode=with-sharps-and-flats&lang=' + language,
        }} className="btn btn-red btn-menu" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ position: "absolute", left: 24 + "px", fontSize: 24 + "px" }}><p style={{ fontSize: 28 + "px", display: "inline" }}>♭</p> ♯</div>{language == "russian" ? "Диезы" : "Sharps"}<br></br>{language == "russian" ? "и бемоли" : "& flats"}</Link>
        <Link to={{
          pathname: getPath(),
          search: '?mode=with-double-sharps-and-double-flats&lang=' + language,
        }} className="btn btn-green btn-menu" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", left: 24 + "px", fontSize: 24 + "px" }}>𝄫 <p style={{ fontSize: 32 + "px", display: "inline" }}>𝄪</p></div>
          {language == "russian" ? "Дубль-диезы" : "Double-Sharps"}<br></br>{language == "russian" ? "и дубль-бемоли" : "& double-flats"}
        </Link>
        <ExitButton />
      </span>
    </>
  );
}
