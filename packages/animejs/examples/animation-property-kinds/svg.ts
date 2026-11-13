// Builds the SVG polygon whose points attribute the example animates
const NS = 'http://www.w3.org/2000/svg';

export const svgStar = (): { svg: SVGSVGElement; polygon: SVGPolygonElement } => {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 128 128');
  svg.setAttribute('width', '56');
  svg.setAttribute('height', '56');
  const polygon = document.createElementNS(NS, 'polygon');
  polygon.setAttribute('points', '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96');
  polygon.setAttribute('fill', 'currentColor');
  svg.append(polygon);
  return { svg, polygon };
};
