import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useSearchParams } from 'react-router-dom';
import TrebleClef from './TrebleClef';
import { useRef, useState } from 'react';
import C5 from '../assets/notes/C5.mp3';
import D5 from '../assets/notes/D5.mp3';
import E from '../assets/notes/E5.mp3';
import F from '../assets/notes/F5.mp3';
import G from '../assets/notes/G5.mp3';
import A5 from '../assets/notes/A5.mp3';
import B5 from '../assets/notes/B5.mp3';
import B4 from '../assets/notes/B4.mp3';
import C6 from '../assets/notes/C6.mp3';
import D6 from '../assets/notes/D6.mp3';
import DFlat5 from '../assets/notes/Db5.mp3';
import DFlat6 from '../assets/notes/Db6.mp3';
import EFlat from '../assets/notes/Eb5.mp3';
import GFlat from '../assets/notes/Gb5.mp3';
import AFlat from '../assets/notes/Ab5.mp3';
import BFlat5 from '../assets/notes/Bb5.mp3';
import BFlat4 from '../assets/notes/Bb4.mp3';
import A4 from '../assets/notes/A4.mp3';
import WholeNote from '../assets/Whole_note.svg';
import SharpSymbol from '../assets/Sharp.svg';
import FlatSymbol from '../assets/Flat.svg';
import DoubleSharpSymbol from '../assets/Double_sharp.svg';
import DoubleFlatSymbol from '../assets/Double_flat.svg';
import TurnYourDeviceMessage from './TurnYourDeviceMessagePortrait';
import Cat from '../assets/cat.gif';
import Music from '../assets/praia-de-domingo.mp3';
import Ambience from '../assets/forest-ambience.mp3';
import ShareButton from './ShareButton';

export default function TwoLineOctavePage() {
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
  const ledgerLineRef = useRef(null);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const noteNotation = searchParams.get('note-notation');
  const showBtns = mode == 'warm-up';
  const goodJobMessageRef = useRef(null);
  const wellDoneMessageRef = useRef(null);
  const oopsMessageRef = useRef(null);
  const timeIsUpMessageRef = useRef(null);
  const intervalRef = useRef(null);

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

  let clickedKey;
  let showedNote;

  const showNote = (noteRef, sharpSymbolRef, flatSymbolRef, doubleSharpSymbolRef, doubleFlatSymbolRef, unhideLedgerLine) => {
    console.log(clickedKey, showedNote)

    unhide(noteRef);

    if (unhideLedgerLine) {
      unhide(ledgerLineRef);
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

  const startingMinutes = 1;
  let time = startingMinutes * 60;

  const [finalStats, setFinalStats] = useState(null);

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
      // Stop the interval so it doesn't keep firing after 0:00
      clearInterval(intervalRef.current);
      // Capture final counts in state — mounts <ShareButton> with correct values
      setFinalStats({
        correct: correctAnswersRef.current,
        incorrect: incorrectAnswersRef.current,
      });
      return;
    }

    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerRef.current.innerText = minutes + ':' + seconds;
    time--;
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
    hide(ledgerLineRef);

    const randomNumber = randint(6);

    switch (randomNumber) {
      case 0:
        showedNote = 'A4';
        showNote(aNoteRef, aSharpSymbolRef, aFlatSymbolRef, aDoubleSharpSymbolRef, aDoubleFlatSymbolRef, true);
        break;
      case 1:
        showedNote = 'B4';
        showNote(bNoteRef, bSharpSymbolRef, bFlatSymbolRef, bDoubleSharpSymbolRef, bDoubleFlatSymbolRef, true);
        break;
      case 2:
        showedNote = 'C4';
        showNote(cNoteRef, cSharpSymbolRef, cFlatSymbolRef, cDoubleSharpSymbolRef, cDoubleFlatSymbolRef);
        break;
      case 3:
        showedNote = 'D4';
        showNote(dNoteRef, dSharpSymbolRef, dFlatSymbolRef, dDoubleSharpSymbolRef, dDoubleFlatSymbolRef);
        break;
      case 4:
        showedNote = 'E4';
        showNote(eNoteRef, eSharpSymbolRef, eFlatSymbolRef, eDoubleSharpSymbolRef, eDoubleFlatSymbolRef);
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
              {/*
                ShareButton only mounts once the game ends with the real final
                values — never with the placeholder 0/0 from initial render.
                Canvas starts generating the image immediately on mount, so
                the image is ready long before the user taps the button.
              */}
              {finalStats && (
                <ShareButton
                  correctAnswers={finalStats.correct}
                  incorrectAnswers={finalStats.incorrect}
                />
              )}
              <Link to='/' className='btn btn-orange go-back-button' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{language == "russian" ? "Вернуться в меню" : "Go back to menu"}</Link>
            </span>
            <span id='answers' style={{ position: "fixed", bottom: 0, left: 0, width: 100 + "%" }}>
              <h2 style={{ marginBottom: 0 }}>{language == "russian" ? "Правильных ответов" : "Correct answers"}: {finalStats?.correct ?? 0}</h2>
              <h2>{language == "russian" ? "Неправильных ответов" : "Incorrect answers"}: {finalStats?.incorrect ?? 0}</h2>

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
            <img className="cat-image" src={Cat}></img>
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
            <TrebleClef />
            <img ref={cNoteRef} src={WholeNote} className='hidden note c5'></img>
            <img ref={dNoteRef} src={WholeNote} className='hidden note d5'></img>
            <img ref={eNoteRef} src={WholeNote} className='hidden note e5'></img>
            <img ref={fNoteRef} src={WholeNote} className='hidden note f5'></img>
            <img ref={gNoteRef} src={WholeNote} className='hidden note g5'></img>
            <img ref={aNoteRef} src={WholeNote} className='hidden note a5'></img>
            <img ref={bNoteRef} src={WholeNote} className='hidden note b5'></img>
            <img ref={cSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol c5'></img>
            <img ref={dSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol d5'></img>
            <img ref={eSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol e5'></img>
            <img ref={fSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol f5'></img>
            <img ref={gSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol g5'></img>
            <img ref={aSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol a5'></img>
            <img ref={bSharpSymbolRef} src={SharpSymbol} className='hidden sharp-symbol b5'></img>
            <img ref={cFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol c5'></img>
            <img ref={dFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol d5'></img>
            <img ref={eFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol e5'></img>
            <img ref={fFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol f5'></img>
            <img ref={gFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol g5'></img>
            <img ref={aFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol a5'></img>
            <img ref={bFlatSymbolRef} src={FlatSymbol} className='hidden flat-symbol b5'></img>
            <img ref={cDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol c5'></img>
            <img ref={dDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol d5'></img>
            <img ref={eDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol e5'></img>
            <img ref={fDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol f5'></img>
            <img ref={gDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol g5'></img>
            <img ref={aDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol a5'></img>
            <img ref={bDoubleSharpSymbolRef} src={DoubleSharpSymbol} className='hidden double-sharp-symbol b5'></img>
            <img ref={cDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol c5'></img>
            <img ref={dDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol d5'></img>
            <img ref={eDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol e5'></img>
            <img ref={fDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol f5'></img>
            <img ref={gDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol g5'></img>
            <img ref={aDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol a5'></img>
            <img ref={bDoubleFlatSymbolRef} src={DoubleFlatSymbol} className='hidden double-flat-symbol b5'></img>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr style={{ transform: "translateX(-20%)" }} ref={ledgerLineRef} className='hidden ledger-line' id='ledger-line-above'></hr>
          </span>
        </span>
        {
          showBtns ? <span ref={btnsRef} className='hidden center' id='btns'>
            <button onClick={function () {
              clickedKey = 'C4';
              handleClick();
              playSound(C5);
            }} className='center btn btn-red'>{noteNotation == 'c-d-e' ? 'C' : (language == "russian" ? "до" : "do")}</button>
            <button onClick={function () {
              clickedKey = 'D4';
              handleClick();
              playSound(D5);
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
              playSound(A5);
            }} className='center btn btn-blue'>{noteNotation == 'c-d-e' ? 'A' : (language == "russian" ? "ля" : "la")}</button>
            <button onClick={function () {
              clickedKey = 'B4';
              handleClick();
              playSound(B5);
            }} className='center btn btn-purple'>{noteNotation == 'c-d-e' ? 'B' : (language == "russian" ? "си" : "ti")}</button>
          </span> : <span ref={keyboardRef} className='hidden center' id='keyboard' style={{ left: ((mode != "with-double-sharps-and-double-flats" && mode != "with-sharps" && mode != undefined) ? 76 : 0) / 2 + "px" }}>
            <span id='white-keys' style={{ position: mode == "with-double-sharps-and-double-flats" && "relative", right: mode == "with-double-sharps-and-double-flats" && -70 + "px" }}>
              {mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(A4);
                  clickedKey = 'A4';
                  handleClick();
                }} className='key-white' id='key-a-prev-octave'></button>}
              {(mode == 'white-and-black-keys' || mode == 'with-flats' || mode == 'with-sharps-and-flats' || mode == 'with-double-sharps-and-double-flats') &&
                <button id='key-b4' onMouseDown={function () {
                  playSound(B4);
                  clickedKey = 'B3';
                  handleClick();
                }} className='key-white'></button>}
              <button onMouseDown={function () {
                playSound(C5);
                clickedKey = 'C4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(D5);
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
                playSound(A5);
                clickedKey = 'A4';
                handleClick();
              }} className='key key-white'></button>
              <button onMouseDown={function () {
                playSound(B5);
                clickedKey = 'B4';
                handleClick();
              }} className='key key-white'></button>
              {(mode == 'white-and-black-keys' || mode == 'with-sharps' || mode == 'with-sharps-and-flats' || mode == 'with-double-sharps-and-double-flats') &&
                <button onMouseDown={function () {
                  playSound(C6);
                  clickedKey = 'C5';
                  handleClick();
                }} className='key-white'></button>}
              {mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(D6);
                  clickedKey = 'D5';
                  handleClick();
                }} className='key-white' id='key-d-next-octave'></button>}
            </span>

            <span>
              {
                mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(BFlat4);
                  clickedKey = 'Bb3';
                  handleClick();
                }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='bb-prev-octave'></button>
              }
              <button onMouseDown={function () {
                playSound(DFlat5);
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
                playSound(BFlat5);
                clickedKey = 'Bb4';
                handleClick();
              }} className={mode == "with-double-sharps-and-double-flats" ? "key-black wdf" : "key-black"} id='bb'></button>
              {
                mode == 'with-double-sharps-and-double-flats' &&
                <button onMouseDown={function () {
                  playSound(DFlat6);
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
