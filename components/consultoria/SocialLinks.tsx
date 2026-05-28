import styles from './SocialLinks.module.css'

function YouTubeIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.9.3 2.4.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.5 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.3 1.9-.5 2.4-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.5.2-1.2.5-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.5-.5-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.3-1.9.5-2.4.2-.6.5-1 1-1.5s.9-.8 1.5-1c.5-.2 1.2-.5 2.4-.5C8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.4 4.1.7 3.3 1 2.6 1.5 2 2.1S1 3.3.7 4.1C.4 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.4 2.2.7 3 .3.8.8 1.5 1.4 2.1s1.3 1.1 2.1 1.4c.8.3 1.7.6 3 .7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.4 3-.7.8-.3 1.5-.8 2.1-1.4s1.1-1.3 1.4-2.1c.3-.8.6-1.7.7-3 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.4-2.2-.7-3-.3-.8-.8-1.5-1.4-2.1S20.7 1 19.9.7C19.1.4 18.2.1 16.9 0 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0zM7.1 20.5H3.6V9h3.5v11.5zM5.3 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm15.2 13h-3.5v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.6V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://youtube.com/@dataencriollo', Icon: YouTubeIcon },
  { label: 'Instagram', href: 'https://instagram.com/dataencriollo', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/dataencriollo', Icon: LinkedInIcon },
]

export function SocialLinks() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Seguinos en redes</p>
      <div className={styles.links}>
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <Icon />
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
