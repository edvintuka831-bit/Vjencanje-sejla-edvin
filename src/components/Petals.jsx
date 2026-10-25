// Latice ruža i zlatne iskre – čisti CSS, bez slika.

// Deterministički "nasumični" brojevi da se raspored ne mijenja pri renderu.
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const BURST = Array.from({ length: 34 }, (_, i) => {
  const angle = rand(i + 1) * Math.PI * 2
  const dist = 120 + rand(i + 50) * 260
  return {
    petal: i % 3 !== 0,
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist * 0.8 - 60,
    rot: rand(i + 99) * 720 - 360,
    delay: rand(i + 7) * 0.35,
    size: 0.6 + rand(i + 13) * 0.8,
  }
})

// Prasak latica i iskri pri otvaranju koverte.
export function PetalBurst() {
  return (
    <div className="burst" aria-hidden="true">
      {BURST.map((b, i) => (
        <span
          key={i}
          className={b.petal ? 'burst-petal' : 'burst-spark'}
          style={{ '--dx': `${b.dx}px`, '--dy': `${b.dy}px`, '--rot': `${b.rot}deg`, '--d': `${b.delay}s`, '--s': b.size }}
        />
      ))}
    </div>
  )
}

const FALL = Array.from({ length: 12 }, (_, i) => ({
  left: rand(i + 200) * 100,
  dur: 14 + rand(i + 300) * 12,
  delay: -rand(i + 400) * 26,
  size: 0.55 + rand(i + 500) * 0.7,
  sway: 30 + rand(i + 600) * 60,
}))

// Nježne latice koje polako padaju preko pozivnice.
export function FallingPetals() {
  return (
    <div className="falling" aria-hidden="true">
      {FALL.map((p, i) => (
        <span
          key={i}
          className="fall-petal"
          style={{ left: `${p.left}%`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`, '--s': p.size, '--sway': `${p.sway}px` }}
        />
      ))}
    </div>
  )
}
