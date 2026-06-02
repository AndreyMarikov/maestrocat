import { Link, useSearchParams } from 'react-router-dom';
import ExitButton from "../ExitButton";
import TurnYourDeviceMessage from "../TurnYourDeviceMessageLandscape";
import Dropdown from '../Dropdown';
import { useEffect } from 'react';

export default function NoteReadingPage() {
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

          @media (min-height: 750px) {
            h1 {
              position: static;
              margin-top: 0;
            }
          }

          @media (max-height: 590px) {
            body {
              background-image: none;
            }

            h1 {
              margin-top: 32px;
            }
          }

          @media (max-height: 520px) {
            h1 {
              margin-top: 16px;
            }
          }
        `}
      </style>
      <TurnYourDeviceMessage />
      <Dropdown />
      <span className="center" id="menu-btns">
        <h1>{language == "russian" ? "На время" : "Timed mode"}</h1>
        <Link to={{
          pathname: getPath(),
          search: "?lang=" + language
        }} className="btn btn-blue btn-menu">{language == "russian" ? "Белые клавиши" : "White keys"}</Link>
        <Link to={{
          pathname: '/mode/note-reading/black-keys',
          search: (octave && ('?octave=' + octave)) + "&lang=" + language,
        }} className="btn btn-green btn-menu">{language == "russian" ? "Чёрные клавиши" : "Black keys"}</Link>
        <Link to={{
          pathname: getPath(),
          search: '?mode=white-and-black-keys&lang=' + language,
        }} className="btn btn-purple btn-menu">{language == "russian" ? "Белые и чёрные клавиши" : "White & Black keys"}</Link>
        <ExitButton />
      </span>
    </>
  );
}
