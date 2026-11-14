// Traffic light: lamps lit by flipping visible on a bright copy
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

const LAMPS = ['red', 'yellow', 'green'] as const;
type Lamp = (typeof LAMPS)[number];
const BRIGHT: Record<Lamp, string> = { red: '#ff4a3d', yellow: '#ffd21f', green: '#37e07a' };
const DIM: Record<Lamp, string> = { red: '#5a1d1d', yellow: '#5a4a14', green: '#164a2c' };
const CHOICES = ['auto cycle', 'red', 'yellow', 'green', 'all off'] as const;
type Choice = (typeof CHOICES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look from the side. Each lamp is a dark disc with a bright copy on top.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
    rotate: { x: -0.1, y: -0.5 },
    dragRotate: !stage.preview,
  });

  new Zdog.Cylinder({
    addTo: illo, diameter: 14, length: 90, translate: { y: 55 }, rotate: { x: Math.PI / 2 },
    stroke: false, color: '#888', frontFace: '#aaa',
  });
  new Zdog.Box({
    addTo: illo, width: 70, height: 150, depth: 40, translate: { y: -35 },
    stroke: 6, color: '#333', leftFace: '#2b2b2b', rightFace: '#444', topFace: '#555', bottomFace: '#222', rearFace: '#2b2b2b',
  });
  // one Group: lamps draw in the order added, so each lit copy lands on top of its dark disc
  const face = new Zdog.Group({ addTo: illo, translate: { y: -35, z: 25 } });
  const lit = {} as Record<Lamp, Zdog.Shape>;
  LAMPS.forEach((name, i) => {
    const y = (i - 1) * 46;
    const lamp = new Zdog.Ellipse({ addTo: face, diameter: 30, translate: { y }, stroke: 6, fill: true, color: DIM[name] });
    // the lit copy: same disc, brighter, hidden until switched on
    lit[name] = lamp.copy({ color: BRIGHT[name], visible: false });
    lit[name].stroke = 8;
  });
  // a glow ring around the lit lamp, moved to whichever is on
  const glow = new Zdog.Ellipse({ addTo: face, diameter: 52, stroke: 3, color: '#fff', visible: false });

  let choice: Choice = 'auto cycle';
  const light = (on: Lamp | null): void => {
    for (const n of LAMPS) lit[n].visible = n === on;
    glow.visible = on !== null;
    if (on) {
      glow.translate.y = (LAMPS.indexOf(on) - 1) * 46;
      glow.color = BRIGHT[on];
    }
  };
  // red -> green -> yellow -> red, like a real signal
  const SEQ: Lamp[] = ['red', 'green', 'yellow'];
  let step = 0;
  const auto = (): void => {
    if (choice === 'auto cycle') light(SEQ[step++ % SEQ.length]!);
  };
  auto();
  stage.every(stage.preview ? 1200 : 1800, auto);

  if (stage.bar) {
    select(stage.bar, 'light', CHOICES, (v) => {
      choice = v;
      if (v === 'auto cycle') auto();
      else light(v === 'all off' ? null : v);
    }, choice);
  }

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = -0.5 + 0.5 * Math.sin(t * 0.6);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
