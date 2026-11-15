// The SPC chart traces (data, violations, limits, centre) for the first n points
import type { Data } from 'plotly.js';

const X = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const SPC_Y = [4, 2, -1, 4, -5, -7, 0, 3, 8];
const LIMIT = 5;

/** The x and y columns of the four traces for the first n points; violations lie outside the limits. */
export function spcColumns(n: number): { x: (number | null)[]; y: (number | null)[] }[] {
  const x = X.slice(0, n);
  const y = SPC_Y.slice(0, n);
  const out = x.flatMap((v, i) => ((y[i] ?? 0) > LIMIT || (y[i] ?? 0) < -LIMIT ? [i] : []));
  return [
    { x, y },
    { x: out.map((i) => x[i] ?? 0), y: out.map((i) => y[i] ?? 0) },
    { x: [0.5, 10, null, 0.5, 10], y: [-LIMIT, -LIMIT, null, LIMIT, LIMIT] },
    { x: [0.5, 10], y: [0, 0] },
  ];
}

export function spcTraces(n: number): Data[] {
  const [data, viol, limits, centre] = spcColumns(n) as { x: number[]; y: number[] }[] as [
    { x: number[]; y: number[] }, { x: number[]; y: number[] }, { x: number[]; y: number[] }, { x: number[]; y: number[] },
  ];
  return [
    { type: 'scatter', ...data, mode: 'lines+markers', name: 'Data', hoverinfo: 'all', line: { color: '#60a5fa', width: 2 }, marker: { color: '#60a5fa', size: 8, symbol: 'circle' } },
    { type: 'scatter', ...viol, mode: 'markers', name: 'Violation', marker: { color: 'rgb(255,65,54)', line: { width: 3 }, opacity: 0.5, size: 12, symbol: 'circle-open' } },
    { type: 'scatter', ...limits, mode: 'lines', name: 'LCL/UCL', line: { color: 'red', width: 2, dash: 'dash' } },
    { type: 'scatter', ...centre, mode: 'lines', name: 'Centre', line: { color: 'grey', width: 2 } },
  ];
}
