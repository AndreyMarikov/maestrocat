import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useSearchParams } from 'react-router-dom';
import BassClef from './BassClef';
import { useRef, useState } from 'react';
import C2 from '../assets/notes/C2.mp3';
import D2 from '../assets/notes/D2.mp3';
import E from '../assets/notes/E2.mp3';
import F from '../assets/notes/F2.mp3';
import G from '../assets/notes/G2.mp3';
import A2 from '../assets/notes/A2.mp3';
import A1 from '../assets/notes/A1.mp3';
import B2 from '../assets/notes/B2.mp3';
import B1 from '../assets/notes/B1.mp3';
import C3 from '../assets/notes/C3.mp3';
import D3 from '../assets/notes/D3.mp3';
import DFlat2 from '../assets/notes/Db2.mp3';
import DFlat3 from '../assets/notes/Db3.mp3';
import EFlat from '../assets/notes/Eb2.mp3';
import GFlat from '../assets/notes/Gb2.mp3';
import AFlat from '../assets/notes/Ab2.mp3';
import BFlat2 from '../assets/notes/Bb2.mp3';
import BFlat1 from '../assets/notes/Bb1.mp3';
import WholeNote from '../assets/Whole_note.svg';
import SharpSymbol from '../assets/Sharp.svg';
import FlatSymbol from '../assets/Flat.svg';
import DoubleSharpSymbol from '../assets/Double_sharp.svg';
import DoubleFlatSymbol from '../assets/Double_flat.svg';
import TurnYourDeviceMessage from './TurnYourDeviceMessagePortrait';
import Kitya from '../assets/kitya.gif';
import Music from '../assets/praia-de-domingo.mp3';
import Ambience from '../assets/forest-ambience.mp3';
import ShareButton from './ShareButton';

export default function GreatOctavePage() {
  const btnsRef = useRef(null);
  const keyboardRef = useRef(null);
  const startBtnRef = useRef(null);
  const aNoteRef = useRef(null);
  const bNoteRef = useRef(null);
  const cNoteRef = useRef(null);
  const dNoteRef = useRef(null);
  const eNoteRef = useRef(null);
  const fNoteRef = useRef(null);
  const gNoteRef = useRef(null);
  const cSharpSymbolRef = useRef(null);
  const dSharpSymbolRef = useRef(null);
  const eSharpSymbolRef = useRef(null);
  const fSharpSymbolRef = useRef(null);
  const gSharpSymbolRef = useRef(null);
  const aSharpSymbolRef = useRef(null);
  const bSharpSymbolRef = useRef(null);
  const cFlatSymbolRef = useRef(null);
  const dFlatSymbolRef = useRef(null);
  const eFlatSymbolRef = useRef(null);
  const fFlatSymbolRef = useRef(null);
  const gFlatSymbolRef = useRef(null);
  const aFlatSymbolRef = useRef(null);
  const bFlatSymbolRef = useRef(null);
  const cDoubleSharpSymbolRef = useRef(null);
  const dDoubleSharpSymbolRef = useRef(null);
  const eDoubleSharpSymbolRef = useRef(null);
  const fDoubleSharpSymbolRef = useRef(null);
  const gDoubleSharpSymbolRef = useRef(null);
  const aDoubleSharpSymbolRef = useRef(null);
  const bDoubleSharpSymbolRef = useRef(null);
  const cDoubleFlatSymbolRef = useRef(null);
  const dDoubleFlatSymbolRef = useRef(null);
  const eDoubleFlatSymbolRef = useRef(null);
  const fDoubleFlatSymbolRef = useRef(null);
  const gDoubleFlatSymbolRef = useRef(null);
  const aDoubleFlatSymbolRef = useRef(null);
  const bDoubleFlatSymbolRef = useRef(null);
  const timerRef = useRef(null);
  const ledgerLine1Ref = useRef(null);
  const ledgerLine2Ref = useRef(null);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const noteNotation = searchParams.get('note-notation');
  const showBtns = mode == 'warm-up';
  const goodJobMessageRef = useRef(null);
  const wellDoneMessageRef = useRef(null);
  const oopsMessageRef = useRef(null);
  const timeIsUpMessageRef = useRef(null);

  const randint = (x) => {
    return Math.floor(Math.random() * (x + 1));
  }

  let currentNoteRef;
  let currentSharpSymbolRef;
  let currentFlatSymbolRef;
  let currentDoubleFlatSymbolRef;
  let currentDoubleSharpSymbolRef;

  const hide = (ref) => {
    ref.current.classList.add('hidden');
  }

  const unhide = (ref) => {
    ref.current.classList.remove('hidden');
  }

  const startingMinutes = 1;
  let time = startingMinutes * 60;

  let [count, setCount] = useState(0);
  const forceUpdate = () => {
    setCount(count => count + 1);
  }

  const updateTimer = () => {
    if (!timerRef.current) {
      return;
    }

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes == 0 && seconds == 0) {
      timerRef.current.innerText = '0:00';
      timeIsUpMessageRef.current.classList.remove('hidden');
      forceUpdate();
      return;
    }

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerRef.current.innerText = minutes + ':' + seconds;
    time--;
  }

  let clickedKey;
  let showedNote;

  const showNote = (noteRef, sharpSymbolRef, flatSymbolRef, doubleSharpSymbolRef, doubleFlatSymbolRef, unhideLedgerLine1, unhideLedgerLine2) => {
    unhide(noteRef);

    if (unhideLedgerLine1) {
      unhide(ledgerLine1Ref);
    }
    if (unhideLedgerLine2) {
      unhide(ledgerLine2Ref);
    }
    if (mode == 'with-double-sharps-and-double-flats') {
      const randomNumber = Math.random();

      if (randomNumber < 0.5) {
        unhide(doubleSharpSymbolRef);
        currentDoubleSharpSymbolRef = doubleSharpSymbolRef;
        switch (showedNote) {
          case 'A4':
            showedNote = 'B4';
            break;
          case 'B4':
            showedNote = 'Db5';
            break;
          case 'C4':
            showedNote = 'D4';
            break;
          case 'D4':
            showedNote = 'E4';
            break;
          case 'E4':
            showedNote = 'Gb4';
            break;
          case 'F4':
            showedNote = 'G4';
            break;
          case 'G4':
            showedNote = 'A4';
            break;
        }
      } else {
        unhide(doubleFlatSymbolRef);
        currentDoubleFlatSymbolRef = doubleFlatSymbolRef;
        switch (showedNote) {
          case 'A4':
            showedNote = 'G4';
            break;
          case 'B4':
            showedNote = 'A4';
            break;
          case 'C4':
            showedNote = 'Bb3';
            break;
          case 'D4':
            showedNote = 'C4';
            break;
          case 'E4':
            showedNote = 'D4';
            break;
          case 'F4':
            showedNote = 'Eb4';
            break;
          case 'G4':
            showedNote = 'F4';
            break;
        }
      }
    }
    if (mode == 'white-and-black-keys') {
      const randomNumber = Math.random();

      if (randomNumber <= 1 / 3) {
        unhide(sharpSymbolRef);
        currentSharpSymbolRef = sharpSymbolRef;
        switch (showedNote) {
          case 'A4':
            showedNote = 'Bb4';
            break;
          case 'B4':
            showedNote = 'C5';
            break;
          case 'C4':
            showedNote = 'Db4';
            break;
          case 'D4':
            showedNote = 'Eb4';
            break;
          case 'E4':
            showedNote = 'F4';
            break;
          case 'F4':
            showedNote = 'Gb4';
            break;
          case 'G4':
            showedNote = 'Ab4';
            break;
        }
      } else if (randomNumber < 2 / 3) {
        unhide(flatSymbolRef);
        currentFlatSymbolRef = flatSymbolRef;
        switch (showedNote) {
          case 'A4':
            showedNote = 'Ab4';
            break;
          case 'B4':
            showedNote = 'Bb4';
            break;
          case 'C4':
            showedNote = 'B3';
            break;
          case 'D4':
            showedNote = 'Db4';
            break;
          case 'E4':
            showedNote = 'Eb4';
            break;
          case 'F4':
            showedNote = 'E4';
            break;
          case 'G4':
            showedNote = 'Gb4';
            break;
        }
      }
    }
    if (mode == 'with-sharps-and-flats') {
      const randomNumber = Math.random();

      if (randomNumber < 0.5) {
        unhide(sharpSymbolRef);
        currentSharpSymbolRef = sharpSymbolRef;
        switch (showedNote) {
          case 'A4':
            showedNote = 'Bb4';
            break;
          case 'B4':
            showedNote = 'C5';
            break;
          case 'C4':
            showedNote = 'Db4';
            break;
          case 'D4':
            showedNote = 'Eb4';
            break;
          case 'E4':
            showedNote = 'F4';
            break;
          case 'F4':
            showedNote = 'Gb4';
            break;
          case 'G4':
            showedNote = 'Ab4';
            break;
        }
      } else {
        unhide(flatSymbolRef);
        currentFlatSymbolRef = flatSymbolRef;
        switch (showedNote) {
          case 'A4':
            showedNote = 'Ab4';
            break;
          case 'B4':
            showedNote = 'Bb4';
            break;
          case 'C4':
            showedNote = 'B3';
            break;
          case 'D4':
            showedNote = 'Db4';
            break;
          case 'E4':
            showedNote = 'Eb4';
            break;
          case 'F4':
            showedNote = 'E4';
            break;
          case 'G4':
            showedNote = 'Gb4';
            break;
        }
      }
    }
    if (sharpSymbolRef && mode == 'with-sharps') {
      unhide(sharpSymbolRef);
      currentSharpSymbolRef = sharpSymbolRef;
      switch (showedNote) {
        case 'A4':
          showedNote = 'Bb4';
          break;
        case 'B4':
          showedNote = 'C5';
          break;
        case 'C4':
          showedNote = 'Db4';
          break;
        case 'D4':
          showedNote = 'Eb4';
          break;
        case 'E4':
          showedNote = 'F4';
          break;
        case 'F4':
          showedNote = 'Gb4';
          break;
        case 'G4':
          showedNote = 'Ab4';
          break;
      }
    } else if (flatSymbolRef && mode == 'with-flats') {
      unhide(flatSymbolRef);
      currentFlatSymbolRef = flatSymbolRef;
      switch (showedNote) {
        case 'A4':
          showedNote = 'Ab4';
          break;
        case 'B4':
          showedNote = 'Bb4';
          break;
        case 'C4':
          showedNote = 'B3';
          break;
        case 'D4':
          showedNote = 'Db4';
          break;
        case 'E4':
          showedNote = 'Eb4';
          break;
        case 'F4':
          showedNote = 'E4';
          break;
        case 'G4':
          showedNote = 'Gb4';
          break;
      }
    }

    currentNoteRef = noteRef;
  }

  let correctAnswersRef = useRef(0);
  let incorrectAnswersRef = useRef(0);

  const handleClick = () => {
    if (showedNote && clickedKey) {
      if (showedNote != clickedKey) {
        incorrectAnswersRef.current += 1;
        unhide(oopsMessageRef);
        hide(wellDoneMessageRef);
        hide(goodJobMessageRef);
      } else {
        correctAnswersRef.current += 1;
        const randomNumber = randint(1);
        hide(wellDoneMessageRef);
        hide(goodJobMessageRef);
        hide(oopsMessageRef);
        if (randomNumber == 0) {
          unhide(wellDoneMessageRef);
        } else {
          unhide(goodJobMessageRef);
        }
      }
    }
    if (currentNoteRef) {
      hide(currentNoteRef);
    }
    if (currentSharpSymbolRef) {
      hide(currentSharpSymbolRef);
    }
    if (currentFlatSymbolRef) {
      hide(currentFlatSymbolRef);
    }
    if (currentDoubleSharpSymbolRef) {
      hide(currentDoubleSharpSymbolRef);
    }
    if (currentDoubleFlatSymbolRef) {
      hide(currentDoubleFlatSymbolRef);
    }
    hide(ledgerLine1Ref);
    hide(ledgerLine2Ref);

    const randomNumber = randint(6);

    switch (randomNumber) {
      case 0:
        showedNote = 'A4';
        showNote(aNoteRef, aSharpSymbolRef, aFlatSymbolRef, aDoubleSharpSymbolRef, aDoubleFlatSymbolRef);
        break;
      case 1:
        showedNote = 'B4';
        showNote(bNoteRef, bSharpSymbolRef, bFlatSymbolRef, bDoubleSharpSymbolRef, bDoubleFlatSymbolRef);
        break;
      case 2:
        showedNote = 'C4';
        showNote(cNoteRef, cSharpSymbolRef, cFlatSymbolRef, cDoubleSharpSymbolRef, cDoubleFlatSymbolRef, true, true);
        break;
      case 3:
        showedNote = 'D4';
        showNote(dNoteRef, dSharpSymbolRef, dFlatSymbolRef, dDoubleSharpSymbolRef, dDoubleFlatSymbolRef, true);
        break;
      case 4:
        showedNote = 'E4';
        showNote(eNoteRef, eSharpSymbolRef, eFlatSymbolRef, eDoubleSharpSymbolRef, eDoubleFlatSymbolRef, true);
        break;
      case 5:
        showedNote = 'F4';
        showNote(fNoteRef, fSharpSymbolRef, fFlatSymbolRef, fDoubleSharpSymbolRef, fDoubleFlatSymbolRef);
        break;
      case 6:
        showedNote = 'G4';
        showNote(gNoteRef, gSharpSymbolRef, gFlatSymbolRef, gDoubleSharpSymbolRef, gDoubleFlatSymbolRef);
        break;
    }
  }

  const playSound = (soundEffect) => {
    const audio = new Audio(soundEffect);
    audio.play();
  }

  const language = searchParams.get("lang");

  return (
    <>
      <style>
        {`
          body {
            background-image: none;
          }
        `}
      </style>
      <TurnYourDeviceMessage />
      <span ref={timeIsUpMessageRef} className='hidden warning-message time-is-up-msg center'>
        <span style={{ position: "fixed", top: 0, gap: 24 + "px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ position: "static", width: "100%" }}>{language == "russian" ? "Время вышло" : "Time is up"}!</h1>
          <span>
            <span style={{ display: "flex", gap: 8 + "px", height: 66 + "px" }}>
              <ShareButton correctAnswers={correctAnswersRef.current} incorrectAnswers={incorrectAnswersRef.current} />
              <Link to='/' className='btn btn-orange go-back-button' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{language == "russian" ? "Вернуться в меню" : "Go back to menu"}</Link>
            </span>
            <span id='answers' style={{ position: "fixed", bottom: 0, left: 0, width: 100 + "%" }}>
              <h2 style={{ marginBottom: 0 }}>{language == "russian" ? "Правильных ответов" : "Correct answers"}: {correctAnswersRef.current}</h2>
              <h2>{language == "russian" ? "Неправильных ответов" : "Incorrect answers"}: {incorrectAnswersRef.current}</h2>
            </span>
          </span>
        </span>
      </span>
      <link rel='stylesheet' href='octave.css'></link>
      <span className='center wrapper' style={{ position: (mode === "warm-up" && "relative"), bottom: (mode === "warm-up" && 32 + "px") }}>
        <header>
          <Link to='/' title='Вернуться в меню'>
            <i className='bi bi-arrow-left center'></i>
          </Link>
          <span id='hearts' className='center'>
          </span>
          {!showBtns && <span>
            <p ref={timerRef} id='timer' className='center'>
              1:00
            </p>
          </span>}
        </header>
        <span className='center' id='staff-wrapper'>
          <span style={{ "position": "relative" }}>
            <img className="cat-image" src={Kitya}></img>
            <span ref={oopsMessageRef} className='message center hidden' id='message1'>
              {language == "russian" ? "Упс" : "Whoops"}...
            </span>
            <span ref={goodJobMessageRef} className='message center hidden' id='message2'>
              {language == "russian" ? "Так держать" : "Keep it up"}!
            </span>
            <span ref={wellDoneMessageRef} className='message center hidden' id='message3'>
              {language == "russian" ? "Молодец" : "Well done"}!
            </span>
          </span>
          <span id='staff'>
            <BassClef />
            <img ref={cNoteRef} src={WholeNote} className='hidden note c2'></img>
            <img ref={dNoteRef} src={WholeNote} className='hidden note d2'></img>
            <img ref={eNoteRef} src={WholeNote} className='hidden note e2'></img>
            <img ref={fNoteRef} src={WholeNote} className='hidden note f2'></img>
            <img ref={gNoteRef} src={WholeNote} className='hidden note g2'></img>
            <img ref={aNoteRef} src={WholeNote} className='hidden note a2'></img>
            <img ref={bNoteRef} src={WholeNote} className='hidden note b2'></img>
            <img ref={cSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol c2'></img>
            <img ref={dSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol d2'></img>
            <img ref={eSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol e2'></img>
            <img ref={fSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol f2'></img>
            <img ref={gSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol g2'></img>
            <img ref={aSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol a2'></img>
            <img ref={bSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol b2'></img>
            <img ref={cFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol c2'></img>
            <img ref={dFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol d2'></img>
            <img ref={eFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol e2'></img>
            <img ref={fFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol f2'></img>
            <img ref={gFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol g2'></img>
            <img ref={aFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol a2'></img>
            <img ref={bFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol b2'></img>
            <img ref={cDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol c2'></img>
            <img ref={dDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol d2'></img>
            <img ref={eDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol e2'></img>
            <img ref={fDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol f2'></img>
            <img ref={gDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol g2'></img>
            <img ref={aDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol a2'></img>
            <img ref={bDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol b2'></img>
            <img ref={cDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol c2'></img>
            <img ref={dDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol d2'></img>
            <img ref={eDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol e2'></img>
            <img ref={fDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol f2'></img>
            <img ref={gDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol g2'></img>
            <img ref={aDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol a2'></img>
            <img ref={bDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol b2'></img>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr style={{ transform: "translateX(-20%)" }} ref={ledgerLine1Ref} className='hidden ledger-line' id='ledger-line1'></hr>
            <hr style={{ transform: "translateX(-20%)" }} ref={ledgerLine2Ref} className='hidden ledger-line' id='ledger-line2'></hr>
          </span>

        </span>
        {
          showBtns ? <span ref={btnsRef} className='hidden center' id='btns'>
            <button onClick={function () {
              clickedKey = 'C4';
              handleClick();
              playSound(C2);
            }} className='center btn btn-red'>{noteNotation == 'c-d-e' ? 'C' : (language == "russian" ? "до" : "do")}</button>
            <button onClick={function () {
              clickedKey = 'D4';
              handleClick();
              playSound(D2);
            }} className='center btn btn-orange'>{noteNotation == 'c-d-e' ? 'D' : (language == "russian" ? "ре" : "re")}</button>
            <button onClick={function () {
              clickedKey = 'E4';
              handleClick();
              playSound(E);
            }} className='center btn btn-yellow'>{noteNotation == 'c-d-e' ? 'E' : (language == "russian" ? "ми" : "mi")}</button>
            <button onClick={function () {
              clickedKey = 'F4';
              handleClick();
              playSound(F);
            }} className='center btn btn-green'>{noteNotation == 'c-d-e' ? 'F' : (language == "russian" ? "фа" : "fa")}</button>
            <button onClick={function () {
              clickedKey = 'G4';
              handleClick();
              playSound(G);
            }} className='center btn btn-cyan'>{noteNotation == 'c-d-e' ? 'G' : (language == "russian" ? "соль" : "sol")}</button>
            <button onClick={function () {
              clickedKey = 'A4';
              handleClick();
              playSound(A2);
            }} className='center btn btn-blue'>{noteNotation == 'c-d-e' ? 'A' : (language == "russian" ? "ля" : "la")}</button>
            <button onClick={function () {
              clickedKey = 'B4';
              handleClick();
              playSound(B2);
            }} className='center btn btn-purple'>{noteNotation == 'c-d-e' ? 'B' : (language == "russian" ? "си" : "ti")}</button>
          </span> : <span ref={keyboardRef} className='hidden center' id='keyboard' style={{ left: ((mode != "with-double-sharps-and-double-flats" && mode != "with-sharps" && mode != undefined) ? 76 : 0) / 2 + "px" }}>
            <span id='white-keys' style={{ position: mode == "with-double-sharps-and-double-flats" && "relative", right: mode == "with-double-sharps-and-double-flats" && -70 + "px" }}>
              {mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(A1);
                  clickedKey = 'A3';
                  handleClick();
                }} className='key-white' id='key-a-prev-octave'></button>}
              {(mode == 'white-and-black-keys' || mode == 'with-flats' || mode == 'with-sharps-and-flats' || mode == 'with-double-sharps-and-double-flats') &&
                <button id='key-b1' onMouseDown={function () {
                  playSound(B1);
                  clickedKey = 'B3';
                  handleClick();
                }} className='key-white'></button>}
              <button onMouseDown={function () {
                playSound(C2);
                clickedKey = 'C4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(D2);
                clickedKey = 'D4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(E);
                clickedKey = 'E4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(F);
                clickedKey = 'F4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(G);
                clickedKey = 'G4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(A2);
                clickedKey = 'A4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(B2);
                clickedKey = 'B4';
                handleClick();
              }} className='key key-white'></button>
              {(mode == 'white-and-black-keys' || mode == 'with-sharps' || mode == 'with-sharps-and-flats' || mode == 'with-double-sharps-and-double-flats') &&
                <button onMouseDown={function () {
                  playSound(C3);
                  clickedKey = 'C5';
                  handleClick();
                }} className='key-white'></button>}
              {mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(D3);
                  clickedKey = 'D5';
                  handleClick();
                }} className='key-white' id='key-d-next-octave'></button>}
            </span>

            <span>
              {
                mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(BFlat1);
                  clickedKey = 'Bb3';
                  handleClick();
                }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='bb-prev-octave'></button>
              }
              <button onMouseDown={function () {
                playSound(DFlat2);
                clickedKey = 'Db4';
                handleClick();
              }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='db'></button>
              <button onMouseDown={function () {
                playSound(EFlat);
                clickedKey = 'Eb4';
                handleClick();
              }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='eb'></button>
              <button onMouseDown={function () {
                playSound(GFlat);
                clickedKey = 'Gb4';
                handleClick();
              }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='gb'></button>
              <button onMouseDown={function () {
                playSound(AFlat);
                clickedKey = 'Ab4';
                handleClick();
              }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='ab'></button>
              <button onMouseDown={function () {
                playSound(BFlat2);
                clickedKey = 'Bb4';
                handleClick();
              }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='bb'></button>
              {
                mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(DFlat3);
                  clickedKey = 'Db5';
                  handleClick();
                }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='db-next-octave'></button>
              }
            </span>
          </span>
        }
        <button ref={startBtnRef} className='center btn btn-green' id='btn-start' onClick={function () {

          if (showBtns) {
            unhide(btnsRef);
          } else {
            unhide(keyboardRef);
            setInterval(updateTimer, 1000);
          }

          hide(startBtnRef);

          handleClick();
        }}>
          {language == "russian" ? "Начать" : "Start"}
        </button>
      </span>
    </>
  );
}
