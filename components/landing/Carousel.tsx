'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const SLIDES = [
  {
    id: 's0',
    tag: 'Tasa de churn · Retención de clientes',
    msg: 'Perder el 5% de tus clientes por mes es perder el 46% en un año.',
    body: 'La tasa de churn es la métrica más ignorada en negocios chicos. Un análisis simple te muestra cuánto vale realmente retener un cliente — y por qué es 5 veces más barato que conseguir uno nuevo.',
    svg: (
      <svg viewBox="0 0 660 280" fill="none">
        <g transform="translate(0,280) scale(1,-1)">
          <rect x="60" y="0" width="50" height="90" fill="#D4872E" opacity=".3" style={{transformOrigin:'60px 0',animation:'barGrow .7s ease .1s both'}} />
          <rect x="125" y="0" width="50" height="130" fill="#D4872E" opacity=".5" style={{transformOrigin:'125px 0',animation:'barGrow .7s ease .2s both'}} />
          <rect x="190" y="0" width="50" height="105" fill="#D4872E" opacity=".45" style={{transformOrigin:'190px 0',animation:'barGrow .7s ease .3s both'}} />
          <rect x="255" y="0" width="50" height="160" fill="#D4872E" opacity=".65" style={{transformOrigin:'255px 0',animation:'barGrow .7s ease .4s both'}} />
          <rect x="320" y="0" width="50" height="200" fill="#D4872E" opacity=".85" style={{transformOrigin:'320px 0',animation:'barGrow .7s ease .5s both'}} />
          <rect x="385" y="0" width="50" height="140" fill="#C0392B" opacity=".9" style={{transformOrigin:'385px 0',animation:'barGrow .7s ease .45s both'}} />
          <rect x="450" y="0" width="50" height="80" fill="#C0392B" opacity=".7" style={{transformOrigin:'450px 0',animation:'barGrow .7s ease .35s both'}} />
          <rect x="515" y="0" width="50" height="50" fill="#C0392B" opacity=".5" style={{transformOrigin:'515px 0',animation:'barGrow .7s ease .25s both'}} />
        </g>
        <polyline points="85,205 150,178 215,190 280,142 345,96 410,152 475,208 540,232" stroke="#E74C3C" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" style={{animation:'drawLine 1.8s ease .6s forwards'}} />
        <text x="395" y="80" fontFamily="monospace" fontSize="11" fill="#E74C3C" opacity=".7">CHURN ↑</text>
        <line x1="40" y1="10" x2="40" y2="260" stroke="#FDF6EC" strokeWidth=".5" opacity=".1" />
        <line x1="40" y1="260" x2="620" y2="260" stroke="#FDF6EC" strokeWidth=".5" opacity=".1" />
      </svg>
    ),
  },
  {
    id: 's1',
    tag: 'Margen de contribución · Punto de equilibrio',
    msg: '¿Sabés cuánto vendés para no perder plata?',
    body: 'El punto de equilibrio (break-even) es el número que todo dueño de negocio debería saber de memoria. Si no lo conocés, estás navegando sin brújula. Se calcula en 20 minutos con datos que ya tenés.',
    svg: (
      <svg viewBox="0 0 660 280" fill="none">
        <circle cx="330" cy="140" r="110" stroke="#D4872E" strokeWidth="1.5" fill="none" opacity=".2" />
        <circle cx="330" cy="140" r="80" stroke="#D4872E" strokeWidth="1" fill="none" opacity=".3" />
        <circle cx="330" cy="140" r="50" stroke="#D4872E" strokeWidth="1" fill="none" opacity=".4" />
        <path d="M330 140 L330 30 A110 110 0 0 1 428 195 Z" fill="#D4872E" opacity=".25" />
        <path d="M330 140 L428 195 A110 110 0 0 1 232 195 Z" fill="#C0392B" opacity=".3" />
        <path d="M330 140 L232 195 A110 110 0 0 1 330 30 Z" fill="rgba(212,135,46,.08)" />
        <text x="355" y="95" fontFamily="monospace" fontSize="10" fill="#D4872E" opacity=".8">GANANCIA</text>
        <text x="335" y="210" fontFamily="monospace" fontSize="10" fill="#E74C3C" opacity=".8">COSTOS</text>
        <text x="220" y="130" fontFamily="monospace" fontSize="10" fill="#FDF6EC" opacity=".3">FIJOS</text>
        <circle cx="330" cy="140" r="5" fill="#D4872E" style={{animation:'pulse 2s infinite'}} />
        <line x1="330" y1="140" x2="380" y2="80" stroke="#D4872E" strokeWidth="1.5" opacity=".6" style={{transformOrigin:'330px 140px',animation:'spinSlow 12s linear infinite'}} />
      </svg>
    ),
  },
  {
    id: 's2',
    tag: 'Correlación · Regresión lineal',
    msg: '¿Tu gasto en marketing realmente genera ventas?',
    body: 'Una correlación de 0.94 significa relación casi perfecta entre dos variables. Con una regresión simple podés saber si tus campañas funcionan — o si estás tirando plata. Sin necesitar un estadístico.',
    svg: (
      <svg viewBox="0 0 660 280" fill="none">
        <line x1="60" y1="240" x2="600" y2="240" stroke="#FDF6EC" strokeWidth=".5" opacity=".1" />
        <line x1="60" y1="30" x2="60" y2="240" stroke="#FDF6EC" strokeWidth=".5" opacity=".1" />
        <circle cx="110" cy="210" r="4" fill="#D4872E" opacity=".5" />
        <circle cx="150" cy="195" r="5" fill="#D4872E" opacity=".6" />
        <circle cx="190" cy="185" r="3.5" fill="#D4872E" opacity=".5" />
        <circle cx="230" cy="170" r="6" fill="#D4872E" opacity=".7" />
        <circle cx="270" cy="155" r="4" fill="#D4872E" opacity=".6" />
        <circle cx="310" cy="140" r="7" fill="#D4872E" opacity=".8" />
        <circle cx="350" cy="125" r="4" fill="#D4872E" opacity=".6" />
        <circle cx="390" cy="108" r="5" fill="#D4872E" opacity=".7" />
        <circle cx="430" cy="95" r="3.5" fill="#D4872E" opacity=".55" />
        <circle cx="470" cy="80" r="6" fill="#D4872E" opacity=".8" />
        <circle cx="510" cy="65" r="4.5" fill="#D4872E" opacity=".7" />
        <circle cx="555" cy="50" r="5" fill="#D4872E" />
        <line x1="90" y1="222" x2="570" y2="42" stroke="#FDF6EC" strokeWidth="1.5" strokeDasharray="6,4" opacity=".3" style={{strokeDashoffset:'300',animation:'drawLine 2s ease .3s forwards'}} />
        <text x="540" y="38" fontFamily="monospace" fontSize="9" fill="#D4872E" opacity=".7">r = 0.94</text>
        <text x="65" y="255" fontFamily="monospace" fontSize="9" fill="#FDF6EC" opacity=".2">INVERSIÓN EN MARKETING</text>
      </svg>
    ),
  },
  {
    id: 's3',
    tag: 'Cash flow · Flujo de fondos',
    msg: 'Facturar mucho y quedarse sin caja es más común de lo que pensás.',
    body: 'El flujo de caja proyectado es la diferencia entre un negocio que sobrevive una crisis y uno que no. Con 3 meses de historial se puede modelar. ¿Lo tenés hecho?',
    svg: (
      <svg viewBox="0 0 660 280" fill="none">
        <path d="M60 140 C 120 140 120 80 180 80 S 240 160 300 100 S 360 40 420 60 S 480 120 540 100 S 600 80 620 80" stroke="#D4872E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="700" strokeDashoffset="700" style={{animation:'drawLine 2.5s ease .2s forwards'}} />
        <path d="M60 140 C 120 140 120 180 180 200 S 240 220 300 240 S 360 240 420 230" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="500" strokeDashoffset="500" opacity=".5" style={{animation:'drawLine 2s ease .8s forwards'}} />
        <line x1="60" y1="30" x2="60" y2="260" stroke="#FDF6EC" strokeWidth=".5" opacity=".1" />
        <line x1="60" y1="140" x2="630" y2="140" stroke="#FDF6EC" strokeWidth=".5" opacity=".15" strokeDasharray="4,4" />
        <text x="630" y="144" fontFamily="monospace" fontSize="9" fill="#FDF6EC" opacity=".3">$0</text>
        <circle cx="300" cy="100" r="5" fill="#D4872E" style={{animation:'floatUp 3s ease-in-out infinite'}} />
        <circle cx="420" cy="230" r="4" fill="#C0392B" opacity=".8" style={{animation:'floatUp 3s ease-in-out .5s infinite'}} />
        <text x="280" y="90" fontFamily="monospace" fontSize="9" fill="#D4872E" opacity=".7">INGRESOS</text>
        <text x="430" y="245" fontFamily="monospace" fontSize="9" fill="#E74C3C" opacity=".6">EGRESOS</text>
        <rect x="285" y="150" width="80" height="60" fill="#C0392B" opacity=".08" />
        <text x="310" y="186" fontFamily="monospace" fontSize="8" fill="#E74C3C" opacity=".5">GAP</text>
      </svg>
    ),
  },
]

export function Carousel() {
  const [cur, setCur] = useState(0)
  const curRef = useRef(cur)
  const autoRef = useRef<ReturnType<typeof setInterval>>()

  curRef.current = cur

  const goSlide = useCallback((next: number) => {
    setCur(next)
  }, [])

  const next = useCallback(() => {
    setCur((c) => (c + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setCur((c) => (c - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    autoRef.current = setInterval(next, 5000)
    return () => clearInterval(autoRef.current)
  }, [next])

  const handleNext = () => {
    clearInterval(autoRef.current)
    next()
    autoRef.current = setInterval(next, 5000)
  }

  const handlePrev = () => {
    clearInterval(autoRef.current)
    prev()
    autoRef.current = setInterval(next, 5000)
  }

  const handleDot = (i: number) => {
    if (i === curRef.current) return
    clearInterval(autoRef.current)
    setCur(i)
    autoRef.current = setInterval(next, 5000)
  }

  return (
    <div className="ca">
      <div className="ca-vp">
        {SLIDES.map((s, i) => (
          <div key={s.id} className={`ca-sl${i === cur ? ' on' : ''}`}>
            <div className="ca-bg">{s.svg}</div>
            <div className="ca-ol"></div>
            <div className="ca-tx">
              <div className="ca-tag">{s.tag}</div>
              <div className="ca-msg">{s.msg}</div>
              <div className="ca-bd">{s.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="ca-ct">
        <div className="ca-dt">
          {SLIDES.map((_, i) => (
            <span key={i} className={i === cur ? 'on' : ''} onClick={() => handleDot(i)} />
          ))}
        </div>
        <div className="ca-ar">
          <button className="ca-btn" onClick={handlePrev}>◂ ANT</button>
          <button className="ca-btn" onClick={handleNext}>SIG ▸</button>
        </div>
      </div>
    </div>
  )
}
