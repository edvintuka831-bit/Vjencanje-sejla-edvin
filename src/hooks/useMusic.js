import { useCallback, useEffect, useRef, useState } from 'react'
import { MUSIC } from '../config.js'

// Muzika se pokreće tek na klik gosta (zahtjev svih mobilnih preglednika).
// "available" postaje true tek kada pjesma stvarno krene – ako fajl ne postoji,
// dugme za muziku se uopće ne prikazuje.
export function useMusic() {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const resumeRef = useRef(false)
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.preload = 'none'
    audio.volume = 0
    audio.src = MUSIC.src
    audioRef.current = audio

    const onReady = () => setAvailable(true)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => {
      setAvailable(false)
      setPlaying(false)
    }
    audio.addEventListener('canplay', onReady)
    audio.addEventListener('playing', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    const onVisibility = () => {
      if (document.hidden) {
        resumeRef.current = !audio.paused
        audio.pause()
      } else if (resumeRef.current) {
        audio.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(fadeRef.current)
      audio.pause()
      audio.removeEventListener('canplay', onReady)
      audio.removeEventListener('playing', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const fadeIn = (audio) => {
    cancelAnimationFrame(fadeRef.current)
    const start = performance.now()
    const step = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / 2500))
      audio.volume = MUSIC.volume * t
      if (t < 1) fadeRef.current = requestAnimationFrame(step)
    }
    audio.volume = 0
    fadeRef.current = requestAnimationFrame(step)
  }

  // Mora se pozvati direktno iz klika.
  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const p = audio.play()
    fadeIn(audio)
    if (p && p.then) {
      p.then(() => setAvailable(true)).catch(() => {
        // Fajl ne postoji ili ga preglednik ne može reproducirati.
        if (audio.error) setAvailable(false)
      })
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) play()
    else audio.pause()
  }, [play])

  return { available, playing, play, toggle }
}
