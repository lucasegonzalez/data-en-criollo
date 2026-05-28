'use client'

import { useEffect } from 'react'
import './landing.css'
import { Carousel } from '@/components/landing/Carousel'
import { Calculator } from '@/components/landing/Calculator'
import { Booking } from '@/components/landing/Booking'

export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(
              () => e.target.classList.add('on'),
              parseInt(e.target.getAttribute('data-delay') || '0')
            )
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="landing-page">
      <div className="lp-app">
        {/* HEADER */}
        <header className="hd">
          <div className="hd-in">
            <div className="hd-logo">
              <div className="hd-yt">
                <svg viewBox="0 0 34 24" fill="none">
                  <rect width="34" height="24" rx="4" fill="#D4872E" />
                  <polygon points="14,7 14,17 23,12" fill="#1E0E05" />
                </svg>
                <span className="hd-nm">Data <em>en</em> Criollo<span className="hd-cur"></span></span>
              </div>
              <span className="hd-sub">Canal de YouTube · Consultas personalizadas · Análisis de datos</span>
            </div>
            <span className="hd-bdg">Nueva consulta ▸</span>
          </div>
        </header>

        {/* TICKER */}
        <div className="tk-wr" aria-hidden="true">
          <div className="tk-in">
            <span className="tk-it">TOMÁ DECISIONES CON DATOS <span className="tk-sp">///</span></span>
            <span className="tk-it">ANÁLISIS PARA TU NEGOCIO <span className="tk-sp">///</span></span>
            <span className="tk-it">CONSULTAS PERSONALIZADAS <span className="tk-sp">///</span></span>
            <span className="tk-it">CANAL DE YOUTUBE <span className="tk-sp">///</span></span>
            <span className="tk-it">MENOS INTUICIÓN · MÁS DATOS <span className="tk-sp">///</span></span>
            <span className="tk-it">TOMÁ DECISIONES CON DATOS <span className="tk-sp">///</span></span>
            <span className="tk-it">ANÁLISIS PARA TU NEGOCIO <span className="tk-sp">///</span></span>
            <span className="tk-it">CONSULTAS PERSONALIZADAS <span className="tk-sp">///</span></span>
            <span className="tk-it">CANAL DE YOUTUBE <span className="tk-sp">///</span></span>
            <span className="tk-it">MENOS INTUICIÓN · MÁS DATOS <span className="tk-sp">///</span></span>
          </div>
        </div>

        {/* HERO */}
        <section className="he">
          <div className="he-gr"></div>
          <div className="he-in">
            <p className="he-ey rv">Tu negocio merece certeza, no suposiciones</p>
            <h1 className="rv">
              Evaluá el riesgo<br />
              antes de<br />
              <em>invertir.</em>
            </h1>
            <p className="he-sub rv">
              Los negocios que perduran no adivinan — <strong>miden</strong>. Análisis
              de datos claro y aplicado para emprendedores y dueños de negocio argentinos.
            </p>
          </div>
          <div className="he-dc" aria-hidden="true">▲ +12.4%{'\n'}  │  ╭──╮{'\n'}  │╭─╯  ╰─╮{'\n'}  │╯       ╰──{'\n'}  └────────▶</div>
        </section>

        {/* CAROUSEL */}
        <section className="ca rv">
          <Carousel />
        </section>

        {/* CALCULATOR */}
        <Calculator />

        {/* BOOKING */}
        <Booking />

        {/* FOOTER */}
        <footer className="ft">
          <div className="ft-in">
            <div className="ft-lk">
              <a href="https://youtube.com/@dataencriollo" target="_blank" rel="noopener noreferrer">▶ YouTube</a>
              <a href="https://instagram.com/dataencriollo" target="_blank" rel="noopener noreferrer">◈ Instagram</a>
              <a href="https://linkedin.com/company/dataencriollo" target="_blank" rel="noopener noreferrer">in LinkedIn</a>
            </div>
            <span className="ft-cp">DATA EN CRIOLLO © 2026</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
