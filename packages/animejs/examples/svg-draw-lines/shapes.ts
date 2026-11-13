// SVG scaffolding: a line, polyline, rect and path to draw (all drawable element types)
const NS = 'http://www.w3.org/2000/svg';

const make = (tag: string, attrs: Record<string, string>): SVGElement => {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  node.classList.add('stroke');
  return node;
};

export function buildSvg(parent: HTMLElement): SVGElement[] {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 304 112');
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('fill', 'none');
  g.setAttribute('stroke', 'currentColor');
  g.setAttribute('stroke-width', '3');
  g.setAttribute('stroke-linecap', 'round');
  g.setAttribute('stroke-linejoin', 'round');
  const shapes = [
    make('line', { x1: '12', y1: '98', x2: '292', y2: '98' }),
    make('rect', { x: '14', y: '14', width: '60', height: '60', rx: '6' }),
    make('polyline', { points: '96,74 118,14 140,74 162,14 184,74' }),
    make('path', { d: 'M206 74 C 206 14, 246 14, 246 44 S 286 74, 290 14' }),
  ];
  g.append(...shapes);
  svg.append(g);
  parent.append(svg);
  return shapes;
}
