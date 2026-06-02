import { Link, useSearchParams } from 'react-router-dom'
import TurnYourDeviceMessage from "../TurnYourDeviceMessageLandscape";
import Dropdown from '../Dropdown';
import { useEffect } from 'react';
import Footer from '../Footer';
import Logo from "../../assets/logo.png";
import ShareButton from "../ShareButton";

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

          @media (min-height: 750px) {
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

          .hr {
            color: hsl(0, 0%, 70%);
            position: relative;
            width: 100%;
            height: 2px;
            background-color: hsl(0, 0%, 80%);
          }
        `}
      </style>
      <TurnYourDeviceMessage />
      <Dropdown />
      {language == "russian" ? <span className='center' id='menu-btns'><h1>Выберите октаву</h1><Link to={{
        pathname: '/mode',
        search: '?octave=one-line&lang=' + language
      }} className="btn btn-green btn-menu"><p style={{ position: "absolute" }}>&#x1D11E;</p>Первая октава<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=two-line&lang=' + language
        }} className="btn btn-orange btn-menu"><p style={{ position: "absolute" }}>&#x1D11E;</p>Вторая октава<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=small&lang=' + language
        }} className="btn btn-blue btn-menu"><p style={{ position: "absolute" }}>&#119074;</p>Малая октава<div></div></Link>
        <div style={{
          width: 100 + "%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 18 + "px"
        }}>
          <Link to={{
            pathname: '/mode',
            search: '?octave=great&lang=' + language
          }} className="btn btn-red btn-menu"><p style={{ position: "absolute" }}>&#119074;</p>Большая октава<div></div></Link>
          {/*
          <div className='hr'>
            <p style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              left: 50 + "%",
              backgroundColor: "var(--white)",
              paddingInline: 10 + "px",
              fontWeight: 500,
              textTransform: "uppercase",
            }}>{language == "english" ? "or" : "или"}</p>
          </div>
          <Link to={{
            pathname: '/mode',
            search: '?octave=great&lang=' + language
          }} className="btn btn-purple btn-menu"><i className='fas fa-book-open' style={{ position: "absolute", left: 24 + "px", alignSelf: "center" }}></i>{language == "english" ? "Learn Theory" : "Учить теорию"}<div></div></Link>
          */}
        </div></span> : <span className='center' id='menu-btns'><h1>Choose note range</h1><Link to={{
          pathname: '/mode',
          search: '?octave=great&lang=' + language
        }} className="btn btn-green btn-menu"><p style={{ position: "absolute" }}>&#119074;</p>Low notes (C2-B2)<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=small&lang=' + language
        }} className="btn btn-orange btn-menu"><p style={{ position: "absolute" }}>&#119074;</p>Low-middle (C3-B3)<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=one-line&lang=' + language
        }} className="btn btn-blue btn-menu"><p style={{ position: "absolute" }}>&#x1D11E;</p>Middle (C4-B4)<div></div></Link>
        <Link to={{
          pathname: '/mode',
          search: '?octave=two-line&lang=' + language
        }} className="btn btn-red btn-menu"><p style={{ position: "absolute" }}>&#x1D11E;</p>High notes (C5-B5)<div></div></Link>
      </span>}
      {/*
      <img src={Logo} style={{
        position: "absolute",
        top: 16 + "px",
        left: 10 + "px",
        height: 24 + "px"
      }}></img>
      */}
    </>
  );
}
