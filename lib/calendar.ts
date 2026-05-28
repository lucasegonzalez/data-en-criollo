import { MONTH_NAMES, DAY_NAMES } from '@/data/calendar'

export interface DayCell {
  day: number
  available: boolean
  selected: boolean
  isPadding: boolean
}

export function buildMonthGrid(
  year: number,
  month: number,
  availableDays: number[],
  selectedDay: number | null
): DayCell[] {
  const cells: DayCell[] = []
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  const totalDays = new Date(year, month + 1, 0).getDate()

  for (let i = 0; i < offset; i++) {
    cells.push({ day: 0, available: false, selected: false, isPadding: true })
  }

  for (let d = 1; d <= totalDays; d++) {
    const av = availableDays.includes(d)
    cells.push({
      day: d,
      available: av,
      selected: selectedDay === d,
      isPadding: false,
    })
  }

  return cells
}

export function monthName(month: number): string {
  return MONTH_NAMES[month]
}

export function dayName(year: number, month: number, day: number): string {
  const idx = (new Date(year, month, day).getDay() + 6) % 7
  return DAY_NAMES[idx]
}

export function formatDate(year: number, month: number, day: number, time: string): string {
  const dn = dayName(year, month, day)
  return `${dn} ${day} de ${monthName(month)} · ${time} hs`
}
