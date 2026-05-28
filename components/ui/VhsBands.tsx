import styles from './VhsBands.module.css'

const VHS_COLORS = [
  '#C0392B',
  '#D4521A',
  '#C8843A',
  '#B5A04A',
  '#7A8C5A',
  '#4A7A7A',
  '#3A5A8A',
]

interface VhsBandsProps {
  height?: number
}

export function VhsBands({ height = 6 }: VhsBandsProps) {
  return (
    <div className={styles.vhs} style={{ height }}>
      {VHS_COLORS.map((c, i) => (
        <div key={i} style={{ background: c }} />
      ))}
    </div>
  )
}
