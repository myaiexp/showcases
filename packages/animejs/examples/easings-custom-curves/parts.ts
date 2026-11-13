// DOM helpers for the custom-curves example: a plotted track row and a labelled slider
import type { EasingFunction } from 'animejs';

const SVG = 'http://www.w3.org/2000/svg';

export interface Track {
  dot: HTMLElement;
  plot(ease: EasingFunction): void;
}

export function makeTrack(name: string, parent: HTMLElement): Track {
  const row = document.createElement('div');
  row.className = 'track';
  const label = document.createElement('code');
  label.textContent = name;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', '0 0 60 40');
  const path = document.createElementNS(SVG, 'polyline');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '1.5');
  svg.append(path);
  const lane = document.createElement('div');
  lane.className = 'lane';
  const dot = document.createElement('div');
  dot.className = 'dot';
  lane.append(dot);
  row.append(label, svg, lane);
  parent.append(row);
  return {
    dot,
    plot(ease) {
      const pts: string[] = [];
      for (let i = 0; i <= 60; i++) pts.push(`${i},${(30 - ease(i / 60) * 20).toFixed(2)}`);
      path.setAttribute('points', pts.join(' '));
    },
  };
}

export function makeSlider(label: string, min: number, max: number, step: number, value: number, onInput: (v: number) => void): HTMLElement {
  const l = document.createElement('label');
  const out = document.createElement('output');
  out.textContent = `${label} ${value}`;
  const r = document.createElement('input');
  r.type = 'range';
  r.min = String(min);
  r.max = String(max);
  r.step = String(step);
  r.value = String(value);
  r.addEventListener('input', () => {
    out.textContent = `${label} ${r.value}`;
    onInput(Number(r.value));
  });
  l.append(out, r);
  return l;
}
