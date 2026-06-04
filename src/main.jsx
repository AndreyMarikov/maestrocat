import { StrictMode, version } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import OctaveMenu from './components/menus/OctaveMenu';
import ModeMenu from './components/menus/ModeMenu';
import NoteNotationMenu from './components/menus/NoteNotationMenu';
import NoteReadingMenu from './components/menus/NoteReadingMenu';
import BlackKeysMenu from './components/menus/BlackKeysMenu';
import NotFoundPage from './components/NotFoundPage';
import GreatOctave from './components/GreatOctave';
import SmallOctave from './components/SmallOctave';
import OneLineOctave from './components/OneLineOctave';
import TwoLineOctave from './components/TwoLineOctave';
import PricingPage from './components/PricingPage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import { supabase } from "./utils/supabase";
import { version as appVersion } from "../package.json";
import semver from "semver";
import ForceUpdateScreen from './components/ForceUpdateScreen';
import UpdateNotification from "./components/UpdateNotification";

await supabase.auth.signInAnonymously();
const { data: { user } } = await supabase.auth.getUser();
await supabase.from("users").insert({
  user_id: user.id,
}).then(({ data, error }) => {
  console.log(error);
});

/*
const { data: { session } } = await supabase.auth.getSession();
console.log("SESSION:", session);
await fetch("https://mrygoukdalzpppcocgqp.supabase.co/functions/v1/get-subscription", {
  method: "POST",
  body: JSON.stringify({
    user_id: user.id
  }),
  headers: {
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  }
}).then(data => {
  console.log(data);
});
*/

const router = createHashRouter([
  {
    path: '/',
    element: <OctaveMenu />,
  },
  {
    path: '/mode',
    element: <ModeMenu />,
  },
  {
    path: '/note-notation',
    element: <NoteNotationMenu />,
  },
  {
    path: '/mode/note-reading',
    element: <NoteReadingMenu />,
  },
  {
    path: '/mode/note-reading/black-keys',
    element: <BlackKeysMenu />,
  },
  {
    path: '/small-octave',
    element: <SmallOctave />,
  },
  {
    path: '/great-octave',
    element: <GreatOctave />,
  },
  {
    path: '/one-line-octave',
    element: <OneLineOctave />,
  },
  {
    path: '/two-line-octave',
    element: <TwoLineOctave />,
  },
  /*
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  */
  {
    path: '*',
    element: <NotFoundPage />
  }
])

let minVersion;
let latestVersion;
await supabase.from("app_config").select("*").then(({ data, error }) => {
  if (error) console.log(error);
  minVersion = data[0]["min_version"];
  latestVersion = data[0]["latest_version"];
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {
      semver.lt(appVersion, minVersion) ?
        <ForceUpdateScreen /> :
        (semver.lt(appVersion, latestVersion) && <UpdateNotification />)
    }
    <RouterProvider router={router} />
  </StrictMode>,
)
