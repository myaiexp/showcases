// Normalize rotate: a safe dial that spins for ever, rotate wrapped to one turn
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, readout, slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Watch the number: normalizeRotate() keeps it between 0 and 6.28 (one turn).' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.25, y: -0.35 },
    dragRotate: !stage.preview,
  });

  // the safe door
  new Zdog.Ellipse({ addTo: illo, diameter: 190, stroke: 14, fill: true, color: '#555', translate: { z: -6 } });
  const dial = new Zdog.Group({ addTo: illo, translate: { z: 6 } });
  new Zdog.Ellipse({ addTo: dial, diameter: 130, stroke: 12, fill: true, color: '#C25' });
  // 12 tick marks around the rim, each a short line at its own angle
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Zdog.TAU;
    new Zdog.Shape({
      addTo: dial, stroke: i % 3 === 0 ? 7 : 4, color: '#fff',
      path: [{ x: Math.sin(a) * 50, y: -Math.cos(a) * 50 }, { x: Math.sin(a) * 38, y: -Math.cos(a) * 38 }],
    });
  }
  new Zdog.Shape({ addTo: dial, path: [{ y: 0 }, { y: -34 }], stroke: 9, color: '#EA0' });
  new Zdog.Shape({ addTo: dial, stroke: 14, color: '#EA0' });

  // a progress bar under the dial: its width follows rotate.z / TAU
  const bar = new Zdog.Rect({ addTo: illo, width: 1, height: 1, translate: { y: 92, z: 6 }, stroke: 8, color: '#a35ac9', fill: true });

  let on = true;
  let speed = 1.8;
  const info = stage.bar ? readout(stage.bar) : null;
  if (stage.bar) {
    checkbox(stage.bar, 'normalizeRotate() each frame', on, (v) => { on = v; });
    slider(stage.bar, 'spin speed', 0.5, 6, 0.1, speed, (v) => { speed = v; }, (v) => `${v.toFixed(1)} rad/s`);
  }

  stage.loop((dt) => {
    dial.rotate.z += dt * speed;
    if (on) dial.normalizeRotate();
    bar.width = Math.max(1, Math.min(1, dial.rotate.z / Zdog.TAU) * 110);
    bar.translate.x = -55 + bar.width / 2;
    bar.updatePath();
    if (info) info.textContent = `dial.rotate.z = ${dial.rotate.z.toFixed(2)} (one turn = ${Zdog.TAU.toFixed(2)})`;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
