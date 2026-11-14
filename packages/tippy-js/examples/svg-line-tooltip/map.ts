// A small transit map: three coloured lines and their stations, drawn as SVG
const SVG = 'http://www.w3.org/2000/svg';

export interface Line {
  name: string;
  color: string;
  points: [number, number][];
}

export const LINES: Line[] = [
  { name: 'Red line: Harbour to Airport', color: '#ef4444', points: [[20, 160], [90, 160], [150, 100], [280, 100]] },
  { name: 'Blue line: Old Town to University', color: '#3b82f6', points: [[40, 50], [110, 50], [150, 100], [200, 160], [280, 160]] },
  { name: 'Green line: Market to Stadium', color: '#22c55e', points: [[150, 30], [150, 100], [150, 185]] },
];

function make<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

/** Draws the map into `parent`; returns the svg and one polyline per line. */
export function drawMap(parent: HTMLElement): { svg: SVGSVGElement; lines: SVGPolylineElement[] } {
  const svg = make('svg', { class: 'map', viewBox: '0 0 300 200' });
  const lines = LINES.map((l) => {
    const pl = make('polyline', {
      points: l.points.map((p) => p.join(',')).join(' '),
      stroke: l.color,
      class: 'route',
    });
    svg.append(pl);
    return pl;
  });
  // Stations: a dot at every corner of every line.
  for (const l of LINES) {
    for (const [x, y] of l.points) svg.append(make('circle', { cx: String(x), cy: String(y), r: '4', class: 'station' }));
  }
  parent.append(svg);
  return { svg, lines };
}

/** The point halfway along a polyline, in viewport coordinates. */
export function midpoint(svg: SVGSVGElement, line: SVGPolylineElement): { x: number; y: number } {
  const pts = Array.from({ length: line.points.numberOfItems }, (_, i) => line.points.getItem(i));
  const lengths = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i]!.x, p.y - pts[i]!.y));
  let rest = lengths.reduce((a, b) => a + b, 0) * 0.6;
  let i = 0;
  while (i < lengths.length - 1 && rest > lengths[i]!) rest -= lengths[i++]!;
  const a = pts[i]!;
  const b = pts[i + 1]!;
  const k = rest / lengths[i]!;
  const m = svg.getScreenCTM()!;
  return { x: m.a * (a.x + (b.x - a.x) * k) + m.e, y: m.d * (a.y + (b.y - a.y) * k) + m.f };
}
