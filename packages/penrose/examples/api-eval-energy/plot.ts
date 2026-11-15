// A small log-scale line plot of energy against iterations, drawn over the paper
const NS = 'http://www.w3.org/2000/svg';

export interface EnergyPlot {
  add(iteration: number, energy: number): void;
  reset(): void;
}

export function energyPlot(paper: HTMLElement): EnergyPlot {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 200 80');
  svg.setAttribute('class', 'energy-plot');
  const line = document.createElementNS(NS, 'polyline');
  const label = document.createElementNS(NS, 'text');
  label.setAttribute('x', '4');
  label.setAttribute('y', '12');
  label.textContent = 'log energy';
  svg.append(line, label);
  paper.append(svg);
  let points: [number, number][] = [];

  const draw = (): void => {
    if (points.length < 2) return line.setAttribute('points', '');
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => Math.log10(Math.max(p[1], 1e-12)));
    const [x0, x1] = [Math.min(...xs), Math.max(...xs, 1)];
    const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
    const sx = (x: number) => 4 + ((x - x0) / (x1 - x0 || 1)) * 192;
    const sy = (y: number) => 76 - ((y - y0) / (y1 - y0 || 1)) * 58;
    line.setAttribute('points', points.map((p, i) => `${sx(p[0]).toFixed(1)},${sy(ys[i]!).toFixed(1)}`).join(' '));
  };
  return {
    add(iteration, energy) {
      points.push([iteration, energy]);
      draw();
    },
    reset() {
      points = [];
      draw();
    },
  };
}
