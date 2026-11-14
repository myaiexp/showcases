// Turns in TAU: a wall clock whose marks and hands are fractions of Zdog.TAU
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU; // one full turn

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to tilt the clock.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -0.3, y: 0.4 },
    dragRotate: true,
  });

  // the face
  new Zdog.Ellipse({ addTo: illo, diameter: 190, stroke: 14, fill: true, color: '#FDB', backface: '#C25' });
  new Zdog.Ellipse({ addTo: illo, diameter: 196, stroke: 10, color: '#C25' });

  // twelve hour marks: each anchor turns TAU/12 more than the last
  for (let h = 0; h < 12; h++) {
    const mark = new Zdog.Anchor({ addTo: illo, rotate: { z: (TAU / 12) * h } });
    new Zdog.Shape({
      addTo: mark,
      path: [{ y: -78 }, { y: h % 3 === 0 ? -64 : -72 }],
      translate: { z: 2 },
      stroke: h % 3 === 0 ? 7 : 4,
      color: '#3a3f4b',
    });
  }

  // hands point up (12 o'clock) and turn around z
  const hand = (length: number, stroke: number, color: string, z: number): Zdog.Anchor => {
    const pivot = new Zdog.Anchor({ addTo: illo, translate: { z } });
    new Zdog.Shape({ addTo: pivot, path: [{ y: 10 }, { y: -length }], stroke, color });
    return pivot;
  };
  const hourHand = hand(46, 9, '#3a3f4b', 6);
  const minuteHand = hand(70, 6, '#3a3f4b', 10);
  const secondHand = hand(76, 2.5, '#E62', 14);
  new Zdog.Shape({ addTo: illo, translate: { z: 16 }, stroke: 10, color: '#E62' });

  const now = new Date();
  let seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  let speed = stage.preview ? 120 : 1; // clock seconds per real second
  let line: HTMLDivElement | null = null;
  if (stage.bar) {
    slider(stage.bar, 'speed ×', 1, 600, 1, speed, (v) => (speed = v));
    line = readout(stage.bar);
  }

  stage.loop((dt) => {
    seconds += dt * speed;
    const h = (seconds / 3600) % 12;
    const m = (seconds / 60) % 60;
    const s = seconds % 60;
    hourHand.rotate.z = (TAU * h) / 12; // 12 hours = 1 turn
    minuteHand.rotate.z = (TAU * m) / 60; // 60 minutes = 1 turn
    secondHand.rotate.z = (TAU * Math.floor(s)) / 60;
    if (line) line.textContent = `minute hand: rotate.z = TAU * ${m.toFixed(1)} / 60 = ${minuteHand.rotate.z.toFixed(3)} rad`;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
