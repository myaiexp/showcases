// Small monthly series with stable ids, for the focus guide examples
export interface Reading {
  id: string;
  month: number;
  label: string;
  series: 'Sensor A' | 'Sensor B';
  value: number;
}

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const a = [12, 18, 15, 24, 30, 27, 36, 41, 35, 38, 46, 52];
const b = [30, 27, 33, 29, 22, 26, 20, 24, 28, 21, 18, 23];

export const readings: readonly Reading[] = labels.flatMap((label, month) => [
  { id: `a${month}`, month, label, series: 'Sensor A' as const, value: a[month]! },
  { id: `b${month}`, month, label, series: 'Sensor B' as const, value: b[month]! },
]);

export const sensorA: readonly Reading[] = readings.filter((r) => r.series === 'Sensor A');
