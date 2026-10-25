import { MUSIC } from '../config.js'
import Icon from './Icons.jsx'

export default function MusicButton({ playing, onToggle }) {
  return (
    <button
      className={`music-btn ${playing ? 'is-playing' : ''}`}
      onClick={onToggle}
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
