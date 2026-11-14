// Conveyor belt: Zdog.modulo wraps crate positions, Zdog.lerp maps them onto the belt
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, readout, slider } from '../../shared/controls.ts';

const CRATES = 5;
const HALF = 110; // the belt runs from x -110 to +110

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { fit: 280, aspect: 0.55, hint: 'Run the belt backwards, then try plain %.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -0.45, y: -0.5 },
  });

  // the belt and its two rollers
  new Zdog.Rect({
    addTo: illo, width: HALF * 2, height: 50, rotate: { x: Zdog.TAU / 4 },
    translate: { y: 16 }, stroke: 6, fill: true, color: '#3a3f4b',
  });
  for (const x of [-HALF, HALF]) {
    new Zdog.Cylinder({ addTo: illo, diameter: 22, length: 54, translate: { x, y: 26 }, stroke: false, color: '#6b7280' });
  }

  const crates = Array.from({ length: CRATES }, (_, i) =>
    new Zdog.Box({
      addTo: illo, width: 26, height: 26, depth: 26, stroke: false,
      color: '#EA0', topFace: '#ED0', leftFace: '#E62', rightFace: '#E62',
      translate: { y: 0 }, rotate: { y: i },
    }),
  );

  let speed = 0.15; // belt lengths per second
  let usePercent = false;
  let offset = 0;
  let line: HTMLDivElement | null = null;
  if (stage.bar) {
    slider(stage.bar, 'speed', -0.4, 0.4, 0.01, speed, (v) => (speed = v));
    checkbox(stage.bar, 'use plain % instead of modulo', false, (v) => (usePercent = v));
    line = readout(stage.bar);
  } else {
    // cards run forwards, then backwards
    stage.every(4000, () => (speed = -speed));
  }

  stage.loop((dt) => {
    offset += speed * dt;
    crates.forEach((crate, i) => {
      const raw = offset + i / CRATES;
      // modulo wraps negatives too; % leaves them negative, so crates fall off the belt
      const along = usePercent ? raw % 1 : Zdog.modulo(raw, 1);
      crate.translate.x = Zdog.lerp(-HALF, HALF, along);
      // shrink near the ends so crates appear and vanish instead of popping
      const edge = Math.min(along, 1 - along) * 8;
      crate.scale.set({ x: 1, y: 1, z: 1 }).multiply(Math.max(0, Math.min(1, edge)));
      crate.visible = along >= 0 && along <= 1;
    });
    if (line) {
      const raw = offset;
      line.textContent = `offset ${raw.toFixed(2)}   % 1 → ${(raw % 1).toFixed(2)}   modulo(…, 1) → ${Zdog.modulo(raw, 1).toFixed(2)}`;
    }
    illo.updateRenderGraph();
  });

  return stage.dispose;
};

export default mount;
