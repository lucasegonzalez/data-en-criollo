import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>
        Transformá los números de tu PyME en decisiones
      </h1>
      <p className={styles.subtitle}>
        Análisis financiero, dashboard a medida y planeamiento estratégico para
        empresas argentinas que quieren crecer con datos, no con intuición.
      </p>
      <a href="#booking" className={styles.cta}>
        Agendá una llamada
      </a>
    </section>
  )
}
