// Zdog primitive switcher with zoom and spin-speed sliders
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import './style.css';

type Kind = 'box' | 'sphere' | 'cone' | 'cylinder' | 'hemisphere';
const KINDS: readonly Kind[] = ['box', 'sphere', 'cone', 'cylinder', 'hemisphere'];

function build(kind: Kind, illo: Zdog.Illustration): Zdog.Anchor {
  const addTo = illo;
  switch (kind) {
    case 'box':
      return new Zdog.Box({ addTo, width: 80, height: 80, depth: 80, stroke: false, color: '#8c6cff' });
    case 'sphere':
      return new Zdog.Shape({ addTo, stroke: 90, color: '#6c8cff' });
    case 'cone':
      return new Zdog.Cone({ addTo, diameter: 80, length: 95, stroke: 12, color: '#19b8c4' });
    case 'cylinder':
      return new Zdog.Cylinder({ addTo, diameter: 72, length: 85, stroke: 12, color: '#30a46c' });
    case 'hemisphere':
      return new Zdog.Hemisphere({ addTo, diameter: 95, stroke: 12, color: '#f5a623' });
  }
}

function slider(label: string, min: number, max: number, step: number, value: number) {
  const wrap = document.createElement('label');
  wrap.className = 'field';
  const input = document.createElement('input');
  Object.assign(input, { type: 'range', min, max, step, value: String(value) });
  const out = document.createElement('span');
  out.className = 'value';
  wrap.append(label, ' ', out, input);
  return { wrap, input, out };
}

const mount: Mount = (el, { preview }) => {
  const canvas = document.createElement('canvas');
  canvas.width = 760;
  canvas.height = 600;
  canvas.className = 'canvas';
  el.append(canvas);

  const illo = new Zdog.Illustration({ element: canvas, dragRotate: true, zoom: 4 });
  illo.rotate.x = -0.5;
  let current = build('box', illo);
  let speed = 0.03;

  const select = document.createElement('select');
  select.className = 'select';
  for (const kind of KINDS) select.append(new Option(kind, kind));
  select.addEventListener('change', () => {
    current.remove();
    current = build(select.value as Kind, illo);
  });

  const zoom = slider('zoom', 1.5, 7, 0.1, 4);
  zoom.out.textContent = '4.0';
  zoom.input.addEventListener('input', () => {
    illo.zoom = Number(zoom.input.value);
    zoom.out.textContent = illo.zoom.toFixed(1);
  });
  const spin = slider('spin', 0, 0.1, 0.005, speed);
  spin.out.textContent = speed.toFixed(3);
  spin.input.addEventListener('input', () => {
    speed = Number(spin.input.value);
    spin.out.textContent = speed.toFixed(3);
  });

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append(select, zoom.wrap, spin.wrap);
    el.append(controls);
  }

  // Previews cycle through the primitives so the card shows the whole set.
  let frame = 0;
  let ticks = 0;
  const animate = (): void => {
    illo.rotate.y += speed;
    if (preview && ++ticks % 120 === 0) {
      current.remove();
      current = build(KINDS[(ticks / 120) % KINDS.length] ?? 'box', illo);
    }
    illo.updateRenderGraph();
    frame = requestAnimationFrame(animate);
  };
  animate();

  return () => cancelAnimationFrame(frame);
};

export default mount;
