import { useState } from 'react'
import Section from '../components/Section.jsx'
import { VENUE } from './config.js'

// Animirani svadbeni automobil: bijelo-zlatni oldtajmer s ružama i mašnom
// dovozi se do restorana, točkovi se okreću, a po dolasku iz njega izlaze srca.
// Animacija kreće kada sekcija uđe u vidno polje; dodir na scenu je ponavlja.

const HEART = 'M0 3 C-4 -1 -9 3 -5 8 L0 13 L5 8 C9 3 4 -1 0 3 Z'

function Wheel({ cx }) {
  return (
    <g className="car-wheel" transform={`translate(${cx} 78)`}>
      <g className="car-wheel-spin">
        <circle r="22" fill="#4b3a28" />
        <circle r="17" fill="#fbf6ec" stroke="#c9a55e" strokeWidth="1.5" />
        {[0, 30, 60, 90, 120, 150].map((a) => (
          <line key={a} x1="-16" y1="0" x2="16" y2="0" stroke="#c9a55e" strokeWidth="1.1" transform={`rotate(${a})`} />
        ))}
        <circle r="5.5" fill="url(#carGold)" stroke="#8c6a2e" strokeWidth="0.8" />
      </g>
    </g>
  )
}

function Rose({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-7 4 Q-12 0 -9 -3 Q-5 0 -3 3 Z" fill="#c9b27a" />
      <path d="M7 4 Q12 0 9 -3 Q5 0 3 3 Z" fill="#c9b27a" />
      <circle r="5.6" fill="#fffdf8" stroke="#d9c39a" strokeWidth="0.9" />
      <path d="M-3 0 Q0 -4 3 0 Q0 3 -3 0 Z" fill="none" stroke="#c9a55e" strokeWidth="0.8" />
      <path d="M-1.4 0.2 Q0 -1.6 1.4 0.2" fill="none" stroke="#c9a55e" strokeWidth="0.7" />
    </g>
  )
}

function Car() {
  return (
    <g className="car-body-bob">
      {/* sjena ispod automobila */}
      <ellipse cx="130" cy="101" rx="122" ry="6" fill="#8c6a2e" opacity="0.16" />

      {/* trag srca iza automobila (prazne limenke zamijenjene srcima) */}
      <path d="M12 60 Q-6 66 -22 76" fill="none" stroke="#d9c39a" strokeWidth="1" strokeDasharray="2 3" />
      <path d={HEART} transform="translate(-26 74) scale(0.7)" fill="#e7cf98" />

      {/* karoserija */}
      <path
        d="M10 70 L10 54 Q12 44 26 42 L72 40 L96 14 Q101 8 111 8 L171 8 Q181 8 187 14 L211 38 L238 42 Q252 45 253 57 L253 70 Q253 76 247 76 L218 76 A26 26 0 0 0 166 76 L92 76 A26 26 0 0 0 40 76 L16 76 Q10 76 10 70 Z"
        fill="url(#carIvory)"
        stroke="#c9a55e"
        strokeWidth="1.6"
      />
      {/* krov – sjaj */}
      <path d="M104 12 L176 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

      {/* prozori */}
      <path d="M101 38 L113 16 L146 16 L146 38 Z" fill="url(#carGlass)" stroke="#c9a55e" strokeWidth="1.2" />
      <path d="M152 38 L152 16 L177 16 Q181 16 184 20 L201 38 Z" fill="url(#carGlass)" stroke="#c9a55e" strokeWidth="1.2" />
      {/* zavjesica s inicijalima */}
      <text x="124" y="32" textAnchor="middle" className="car-initials">Š&amp;E</text>

      {/* zlatna linija i vrata */}
      <path d="M14 53 L250 53" stroke="url(#carGold)" strokeWidth="2.2" />
      <path d="M149 40 L149 74" stroke="#d9c39a" strokeWidth="1" />
      <path d="M100 40 L100 74" stroke="#d9c39a" strokeWidth="1" />
      <rect x="133" y="57" width="10" height="2.6" rx="1.3" fill="url(#carGold)" />
      <rect x="182" y="57" width="10" height="2.6" rx="1.3" fill="url(#carGold)" />

      {/* blatobrani i branici */}
      <path d="M36 77 Q66 44 96 77" fill="none" stroke="url(#carGold)" strokeWidth="1.6" />
      <path d="M162 77 Q192 44 222 77" fill="none" stroke="url(#carGold)" strokeWidth="1.6" />
      <rect x="244" y="64" width="14" height="6" rx="3" fill="url(#carGold)" />
      <rect x="4" y="64" width="12" height="6" rx="3" fill="url(#carGold)" />

      {/* far i svjetlo */}
      <path className="car-beam" d="M253 56 L330 44 L330 74 Z" fill="url(#carBeam)" />
      <circle cx="249" cy="56" r="5" fill="#fff8e1" stroke="#c9a55e" strokeWidth="1.2" />

      {/* mašna i trake od haube do stakla */}
      <path d="M232 44 Q212 26 186 17" fill="none" stroke="#fffdf8" strokeWidth="2.4" />
      <path d="M232 44 Q212 26 186 17" fill="none" stroke="#d9c39a" strokeWidth="0.7" />
      <g transform="translate(234 46)">
        <path d="M0 0 Q-10 -8 -12 0 Q-10 8 0 0 Z" fill="#fffdf8" stroke="#c9a55e" strokeWidth="0.9" />
        <path d="M0 0 Q10 -8 12 0 Q10 8 0 0 Z" fill="#fffdf8" stroke="#c9a55e" strokeWidth="0.9" />
        <path d="M0 0 L-5 11 M0 0 L5 11" stroke="#c9a55e" strokeWidth="1" />
        <circle r="2.4" fill="url(#carGold)" />
      </g>

      {/* ruže na haubi */}
      <Rose x={214} y={36} s={0.95} />
      <Rose x={224} y={39} s={0.8} />
      <Rose x={204} y={35} s={0.75} />

      {/* tablica na zadnjem braniku */}
      <rect x="16" y="56" width="34" height="13" rx="2" fill="#fffdf8" stroke="#c9a55e" strokeWidth="0.9" />
      <text x="33" y="66" textAnchor="middle" className="car-plate">23.01.27</text>

      <Wheel cx={66} />
      <Wheel cx={192} />

      {/* srca koja izlaze nakon dolaska */}
      <g className="car-hearts" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${110 + i * 14} 4)`}>
            <path d={HEART} className="car-heart" style={{ '--i': i }} />
          </g>
        ))}
      </g>
    </g>
  )
}

function Restaurant() {
  return (
    <g transform="translate(455 58)">
      <rect x="0" y="40" width="130" height="114" fill="url(#venueWall)" stroke="#c9a55e" strokeWidth="1.4" />
      <path d="M-8 42 L65 8 L138 42 Z" fill="#f7efe1" stroke="#c9a55e" strokeWidth="1.4" />
      <rect x="22" y="22" width="86" height="18" rx="3" fill="#fffdf8" stroke="#c9a55e" strokeWidth="1" />
      <text x="65" y="35" textAnchor="middle" className="venue-sign">ADS</text>
      {/* prozori koji svijetle */}
      <rect className="venue-window" x="12" y="62" width="26" height="34" rx="13" />
      <rect className="venue-window" x="92" y="62" width="26" height="34" rx="13" style={{ animationDelay: '0.8s' }} />
      {/* vrata */}
      <path d="M48 154 L48 92 Q65 74 82 92 L82 154 Z" fill="url(#venueDoor)" stroke="#c9a55e" strokeWidth="1.2" />
      <circle cx="76" cy="124" r="1.8" fill="#c9a55e" />
      {/* lampioni */}
      <g className="venue-lamp">
        <circle cx="40" cy="98" r="3.4" fill="#ffe7a8" />
        <circle cx="90" cy="98" r="3.4" fill="#ffe7a8" />
      </g>
      {/* tepih do vrata */}
      <path d="M44 154 L86 154 L96 162 L34 162 Z" fill="#e9d29c" opacity="0.7" />
    </g>
  )
}

export default function WeddingCar() {
  const [run, setRun] = useState(0)

  return (
    <Section id="dolazak" className="car-section">
      <p className="eyebrow">Na putu do slavlja</p>
      <button
        type="button"
        className="car-stage"
        onClick={() => setRun((r) => r + 1)}
        aria-label="Animacija svadbenog automobila – dodirnite za ponavljanje"
      >
        <svg viewBox="0 0 600 240" role="img" aria-hidden="true" key={run}>
          <defs>
            <linearGradient id="carIvory" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#fbf5ea" />
              <stop offset="1" stopColor="#efe3cc" />
            </linearGradient>
            <linearGradient id="carGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#9c7a37" />
              <stop offset="0.45" stopColor="#f1dda8" />
              <stop offset="1" stopColor="#a9843f" />
            </linearGradient>
            <linearGradient id="carGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f6efe2" />
              <stop offset="1" stopColor="#e3d3b4" />
            </linearGradient>
            <linearGradient id="carBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffe9b0" stopOpacity="0.75" />
              <stop offset="1" stopColor="#ffe9b0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="venueWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffdf8" />
              <stop offset="1" stopColor="#f3e9d8" />
            </linearGradient>
            <linearGradient id="venueDoor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#efdcae" />
              <stop offset="1" stopColor="#c9a55e" />
            </linearGradient>
          </defs>

          {/* nebo: zvjezdice */}
          {[[60, 30], [150, 18], [250, 40], [340, 22], [410, 46]].map(([x, y], i) => (
            <path key={i} className="car-star" style={{ '--i': i }} d={`M${x} ${y - 5} L${x + 1.4} ${y - 1.4} L${x + 5} ${y} L${x + 1.4} ${y + 1.4} L${x} ${y + 5} L${x - 1.4} ${y + 1.4} L${x - 5} ${y} L${x - 1.4} ${y - 1.4} Z`} fill="#dcc08a" />
          ))}

          <Restaurant />

          {/* cesta */}
          <path d="M0 212 L600 212" stroke="#d9c39a" strokeWidth="1.4" />
          <path className="car-road" d="M-40 224 L640 224" stroke="#e6d5b8" strokeWidth="2" strokeDasharray="18 16" />

          <g transform="translate(176 112)">
            <g className="car-move">
              <Car />
            </g>
          </g>
        </svg>
      </button>
      <p className="car-caption">
        Vidimo se u <b>{VENUE.arrival}</b> u restoranu
      </p>
    </Section>
  )
}
