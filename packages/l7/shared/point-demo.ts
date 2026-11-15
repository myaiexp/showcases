// Point-layer demo helpers: CSV text, arrow images, DOM chart and label markers
import { drawImage } from './images.ts';
import type { Pt } from './point-data.ts';

/** The points as CSV text with a lng,lat,mag,type header: stands in for the docs' fetched .csv/.txt files. */
export function pointCsv(rows: readonly Pt[]): string {
  const head = 'lng,lat,mag,type,value';
  return [head, ...rows.map((p) => `${p.lng.toFixed(3)},${p.lat.toFixed(3)},${p.mag},${p.type},${p.value}`)].join('\n');
}

/** An arrow pointing up, in the given colour, as a data: URL for scene.addImage. */
export function arrowImage(color: string, size = 64): string {
  return drawImage(size, (g, s) => {
    g.fillStyle = color;
    g.beginPath();
    g.moveTo(s * 0.5, s * 0.08);
    g.lineTo(s * 0.86, s * 0.5);
    g.lineTo(s * 0.62, s * 0.5);
    g.lineTo(s * 0.62, s * 0.92);
    g.lineTo(s * 0.38, s * 0.92);
    g.lineTo(s * 0.38, s * 0.5);
    g.lineTo(s * 0.14, s * 0.5);
    g.closePath();
    g.fill();
  });
}

/** A small SVG bar chart in a div (stands in for the G2 chart the docs put inside a Marker). */
export function barChart(values: readonly number[], colors: readonly string[], size = 56): HTMLDivElement {
  const el = document.createElement('div');
  const max = Math.max(...values, 1);
  const w = size / values.length;
  const bars = values
    .map((v, i) => {
      const h = Math.max(2, (v / max) * (size - 6));
      return `<rect x="${i * w + 2}" y="${size - h}" width="${w - 4}" height="${h}" rx="2" fill="${colors[i % colors.length]}"/>`;
    })
    .join('');
  el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="8" fill="rgba(11,19,28,.7)"/>${bars}</svg>`;
  return el;
}

/** A colour for a temperature-like number, from pale yellow to dark red (the ramp the Marker tutorial writes by hand). */
export function heatColor(v: number): string {
  const ramp: [number, string][] = [
    [50, '#800026'], [40, '#BD0026'], [30, '#E31A1C'], [20, '#FC4E2A'], [10, '#FD8D3C'], [5, '#FEB24C'], [0, '#FED976'],
  ];
  for (const [min, c] of ramp) if (v > min) return c;
  return '#FFEDA0';
}
