import { useReveal } from '../hooks/useReveal.js'

export default function Section({ id, className = '', children }) {
  const [ref, visible] = useReveal()
  return (
    <section id={id} ref={ref} className={`section reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </section>
  )
}
