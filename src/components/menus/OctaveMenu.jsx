import { Link, useSearchParams } from 'react-router-dom'
import TurnYourDeviceMessage from "../TurnYourDeviceMessageLandscape";
import Dropdown from '../Dropdown';
import { useEffect } from 'react';
import Footer from '../Footer';
import LearnTheoryButton from '../LearnTheoryButton';

if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", "english");
}

export default function OctaveMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const language = searchParams.get('lang');

  useEffect(() => {
    searchParams.set("lang", localStorage.getItem("lang"));
    setSearchParams(searchParams, { replace: true });
  }, []);

  return (
    <>
      <style>
        {`
          #root {
            justify-content: end !important;
          }

          @media (min-height: 950px) {
            h1 {
              position: static;
              margin-top: 0;
            }
          }

          @media (max-height: 530px) {
            body {
              background-image: none;
            }

            h1 {
              margin-top: 32px;
            }
          }

          
        `}
      </style>
      <TurnYourDeviceMessage />
      <Dropdown />
      <span className='center' id='menu-btns'>
        <h1>{language == "russian" ? "Выберите октаву" : "Choose octave"}</h1>
        <Link to={{
          pathname: '/mode',
          search: '?octave=one-line&lang=' + language
        }} className="btn btn-green btn-menu"><p style={{ position: "absolute" }}>&#x1D11E;</p>{language == "english" ? "One-line octave" : "Первая октава"}<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=two-line&lang=' + language
        }} className="btn btn-orange btn-menu"><p style={{ position: "absolute" }}>&#x1D11E;</p>{language == "english" ? "Two-line octave" : "Вторая октава"}<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=small&lang=' + language
        }} className="btn btn-blue btn-menu"><p style={{ position: "absolute" }}>&#119074;</p>{language == "english" ? "Small octave" : "Малая октава"}<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=great&lang=' + language
        }} className="btn btn-red btn-menu"><p style={{ position: "absolute" }}>&#119074;</p>{language == "english" ? "Great octave" : "Большая октава"}<div></div></Link>
      </span>
      {/*
      <LearnTheoryButton />
      */}
    </>
  );
}
