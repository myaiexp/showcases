// Inherited transforms: a three-joint robot arm where each joint adds to the last
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move one joint and every part after it comes along.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    translate: { y: -12 },
    rotate: { x: -0.25, y: -0.7 },
    dragRotate: true,
  });

  // base plate, then a turntable on top of it
  new Zdog.Cylinder({
    addTo: illo,
    diameter: 80,
    length: 14,
    translate: { y: 75 },
    rotate: { x: TAU / 4 },
    stroke: false,
    color: '#a35ac9',
    frontFace: '#c488e0',
    backface: '#7d3ea3',
  });
  const turntable = new Zdog.Anchor({ addTo: illo, translate: { y: 68 } });

  // each joint is an invisible Anchor added to the part before it
  const shoulder = new Zdog.Anchor({ addTo: turntable });
  const joint = (addTo: Zdog.Anchor): void => {
    new Zdog.Shape({ addTo, stroke: 20, color: '#FDB' });
  };
  joint(shoulder);
  const upper = new Zdog.Shape({ addTo: shoulder, path: [{ y: 0 }, { y: -62 }], stroke: 14, color: '#E62' });

  const elbow = new Zdog.Anchor({ addTo: upper, translate: { y: -62 } });
  joint(elbow);
  const fore = new Zdog.Shape({ addTo: elbow, path: [{ y: 0 }, { y: -52 }], stroke: 12, color: '#EA0' });

  const wrist = new Zdog.Anchor({ addTo: fore, translate: { y: -52 } });
  joint(wrist);
  for (const x of [-8, 8]) {
    new Zdog.Shape({ addTo: wrist, path: [{ x, y: 0 }, { x, y: -18 }], stroke: 5, color: '#fff' });
  }

  const angles = { shoulder: 0.5, elbow: 0.9, wrist: -0.7 };
  const apply = (): void => {
    shoulder.rotate.z = angles.shoulder;
    elbow.rotate.z = angles.elbow;
    wrist.rotate.z = angles.wrist;
  };
  apply();

  let info: HTMLElement | null = null;
  const show = (): void => {
    const sum = angles.shoulder + angles.elbow + angles.wrist;
    if (info) info.textContent = `hand turned ${((sum * 180) / Math.PI).toFixed(0)} degrees = ${[angles.shoulder, angles.elbow, angles.wrist].map((a) => ((a * 180) / Math.PI).toFixed(0)).join(' + ')}`;
  };
  if (stage.bar) {
    for (const k of ['shoulder', 'elbow', 'wrist'] as const) {
      slider(stage.bar, k, -1.6, 1.6, 0.01, angles[k], (v) => { angles[k] = v; apply(); show(); }, (v) => v.toFixed(2));
    }
    info = readout(stage.bar);
    show();
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      // cards wave the arm
      angles.shoulder = 0.4 * Math.sin(t * 1.2);
      angles.elbow = 0.9 * Math.sin(t * 1.9 + 1);
      angles.wrist = 0.8 * Math.sin(t * 2.6);
      apply();
      turntable.rotate.y = 0.5 * Math.sin(t * 0.6);
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
