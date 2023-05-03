import { useEffect, useState } from 'react'

import './App.css'

const day_ms = 864e5;
const birthdate = new Date(2004, 4, 22);
const date_options = { day: "numeric", month: "long", year: "numeric" } as Intl.DateTimeFormatOptions;

function Photo() {
  return <>
    <img src="/kocheng_meng.jpg" alt="Kocheng Meng" />
    <h1>Kocheng Meng</h1>
  </>;
}

function About() {
  return <>
  <div>&nbsp;</div>
  <div>App By Hevanafa (May 2023)</div>
  <div>Made with Vite + React + TypeScript + SWC + Vercel</div>
  </>;
}

export default function App() {
  
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    window.setInterval(() => {
      setNow(new Date())
    }, 1000)
  }, []);

  // Test same day
  // const now = new Date(2023, 4, 22, 8, 0, 0);

  // Test next day
  // const now = new Date(2023, 4, 23, 0, 0, 1);


  let nextBirthday = new Date(
    new Date().getFullYear(),
    birthdate.getMonth(),
    birthdate.getDate());

  if (now.getTime() > nextBirthday.getTime() + day_ms)
    nextBirthday = new Date(
      new Date().getFullYear() + 1,
      birthdate.getMonth(),
      birthdate.getDate());

  const diff = nextBirthday.getTime() - now.getTime();

  if (Math.ceil(Math.abs(diff) / day_ms) > 1) {
    const days = Math.floor(diff / day_ms);
    const h = Math.floor(diff % day_ms / 36e5);
    const m = Math.floor(diff % 36e5 / 60e3);
    const s = Math.floor(diff % 60e3 / 1e3);

    return <div className="card">
      <Photo />
      <div>Ultah: {nextBirthday.toLocaleDateString("id-ID", date_options)}</div>
      <div>Sekarang: {now.toLocaleString("id-ID", {...date_options, hour: '2-digit', minute: '2-digit', second: '2-digit'})}</div>
      <div>{[
        days > 0 ? `${ days } hari` : "",
        h > 0 ? `${h} jam` : "",
        m > 0 ? `${m} menit` : "",
        s > 0 ? `${s} detik` : ""
      ].filter(str => str.length > 0).join(", ") + " "}
      menuju hari ulang tahun</div>

      <About />
    </div>;
  } else {
    return <div className="card">
      <Photo />
      <h1>HBD Meng Imut!  (⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠) 🎉🎂🎈</h1>
      <About />
    </div>
  }
}
