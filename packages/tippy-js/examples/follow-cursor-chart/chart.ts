// A week of daily temperatures drawn as an SVG line chart
export const DAYS = [
  { label: 'Mon', temp: 4 },
  { label: 'Tue', temp: 7 },
  { label: 'Wed', temp: 6 },
  { label: 'Thu', temp: 11 },
  { label: 'Fri', temp: 14 },
  { label: 'Sat', temp: 9 },
  { label: 'Sun', temp: 12 },
];

const SVG = 'http://www.w3.org/2000/svg';

/** Appends the chart to `parent` and returns its svg, the tooltip's reference. */
export function drawChart(parent: HTMLElement): SVGSVGElement {
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('class', 'chart');
  svg.setAttribute('viewBox', '0 0 300 120');
  svg.setAttribute('preserveAspectRatio', 'none');
  const x = (i: number): number => (i / (DAYS.length - 1)) * 300;
  const y = (t: number): number => 110 - (t / 16) * 100;
  const points = DAYS.map((d, i) => `${x(i)},${y(d.temp)}`).join(' ');

  const area = document.createElementNS(SVG, 'polygon');
  area.setAttribute('points', `0,120 ${points} 300,120`);
  area.setAttribute('class', 'area');
  const line = document.createElementNS(SVG, 'polyline');
  line.setAttribute('points', points);
  line.setAttribute('class', 'line');
  svg.append(area, line);
  parent.append(svg);
  return svg;
}
