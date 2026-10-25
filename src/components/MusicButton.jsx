import { MUSIC } from '../config.js'
import Icon from './Icons.jsx'

export default function MusicControls({ music }) {
  const { available, playing, blocked, missing, toggle } = music

  // Fajl ne postoji: pošten link na muzički servis, bez automatske reprodukcije.
  if (missing && !available) {
    return (
      <a className="music-pill" href={MUSIC.fallbackUrl} target="_blank" rel="noopener noreferrer">
        <Icon name="music" size={20} /> {MUSIC.fallbackLabel}
      </a>
    )
  }

  // Preglednik je blokirao reprodukciju – gost je pokreće jednim dodirom.
  if (blocked && !playing) {
    return (
      <button className="music-pill is-pulsing" onClick={toggle}>
        <Icon name="music" size={20} /> Pusti našu pjesmu
      </button>
    )
  }

  if (!available) return null

  return (
    <button
      className={`music-btn ${playing ? 'is-playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? `Isključi muziku (${MUSIC.title})` : `Uključi muziku (${MUSIC.title})`}
      title={MUSIC.title}
    >
      <Icon name={playing ? 'music' : 'musicOff'} size={22} />
      {playing && (
        <span className="eq" aria-hidden="true"><i /><i /><i /></span>
      )}
    </button>
  )
}
