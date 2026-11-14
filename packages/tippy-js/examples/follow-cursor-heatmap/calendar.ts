// Sample commit counts for a 12-week calendar, and the label for a day
export const WEEKS = 12;
const DAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Made-up but stable activity: quieter at weekends. */
export function commits(week: number, day: number): number {
  const n = Math.abs(Math.sin(week * 12.9898 + day * 78.233) * 43758.5453) % 1;
  return Math.floor(n * (day > 4 ? 4 : 10));
}

/** "Tue 3 Mar" for a week column and a weekday row, counting from Mon 5 Jan 2026. */
export function dayLabel(week: number, day: number): string {
  const d = new Date(2026, 0, 5 + week * 7 + day);
  return `${DAY[day]} ${d.getDate()} ${MONTH[d.getMonth()]}`;
}

export function describe(week: number, day: number): string {
  const n = commits(week, day);
  return `${n} ${n === 1 ? 'commit' : 'commits'} on ${dayLabel(week, day)}`;
}
