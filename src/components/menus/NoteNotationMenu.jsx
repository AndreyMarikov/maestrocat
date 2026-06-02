import { Link, useSearchParams } from 'react-router-dom';
import ExitButton from "../ExitButton";
import TurnYourDeviceMessage from "../TurnYourDeviceMessageLandscape";
import Dropdown from '../Dropdown';
import { useEffect } from 'react';

export default function NoteNotationMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const octave = searchParams.get('octave');
  const language = searchParams.get("lang");

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
        `}
      </style>
      <TurnYourDeviceMessage />
      <Dropdown />
      <span id='menu-btns' className='center'>
        <h1>{language == "russian" ? "Выберите обозначение нот" : "Choose note names"}</h1>
        <Link to={getPath() + '?mode=warm-up&note-notation=c-d-e&lang=' + language} className='btn btn-cyan btn-menu'>{language == "english" ? "Letters (C D E)" : "c-d-e"}</Link>
        <Link to={getPath() + '?mode=warm-up&note-notation=do-re-mi&lang=' + language} className='btn btn-orange btn-menu'>{language == "russian" ? "до-ре-ми" : "fixed do (do = c)"}</Link>
        <ExitButton />
      </span>
    </>
  );
}
