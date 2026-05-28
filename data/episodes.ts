export interface Episode {
  id: string
  ch: number
  label: string
  title: string
  subtitle: string
  timecode: string
  image?: string
  icon?: string
}

export const EPISODES: Episode[] = [
  {
    id: 'ep-12',
    ch: 12,
    label: 'EP.12 · CONSUMIDOR',
    title: '800\nCLIENTES.\n40\nVOLVÍAN.',
    subtitle: 'El dato decía otra cosa. Camilo no lo había mirado nunca.',
    timecode: '18:42',
  },
  {
    id: 'ep-11',
    ch: 11,
    label: 'EP.11 · PRECIOS',
    title: 'EL 80/20\nQUE NO\nSABÍAS\nQUE TENÍAS.',
    subtitle: '20% de tus clientes genera el 80% de tu caja.',
    timecode: '14:20',
  },
  {
    id: 'ep-10',
    ch: 10,
    label: 'EP.10 · RETENCIÓN',
    title: 'TUS\nMARTES\nSON UN\nDESIERTO.',
    subtitle: 'No es el barrio. Es el día. El gráfico lo gritaba.',
    timecode: '21:08',
  },
  {
    id: 'ep-09',
    ch: 9,
    label: 'EP.09 · PROYECCIÓN',
    title: '¿CUÁNTAS\nEMPANADAS\nSIN TIRAR\nNINGUNA?',
    subtitle: 'Distribución normal aplicada a tu stock real.',
    timecode: '16:33',
  },
]
