// A clip built from AnimData, AnimCurve and AnimTrack, in three interpolations
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

type Mode = 'step' | 'linear' | 'cubic';
const MODES: Record<Mode, number> = { step: pc.INTERPOLATION_STEP, linear: pc.INTERPOLATION_LINEAR, cubic: pc.INTERPOLATION_CUBIC };

// Keyframe times, in seconds, and what the clip drives at each of them.
const TIMES = [0, 0.5, 1, 1.5, 2];
const HEIGHTS = [0.4, 1.8, 0.7, 1.4, 0.4];
const INTENSITY = [0.5, 3, 1, 2.2, 0.5];

/** Cubic keys store three values per key: in-tangent, value, out-tangent. These are smooth ones. */
function cubic(values: number[]): number[] {
  const out: number[] = [];
  values.forEach((v, i) => {
    const prev = values[Math.max(i - 1, 0)]!;
    const next = values[Math.min(i + 1, values.length - 1)]!;
    const span = TIMES[Math.min(i + 1, TIMES.length - 1)]! - TIMES[Math.max(i - 1, 0)]!;
    const slope = (next - prev) / span;
    out.push(slope, v, slope);
  });
  return out;
}

function buildClip(mode: Mode): pc.AnimTrack {
  const wrap = mode === 'cubic' ? cubic : (v: number[]) => v;
  const y = wrap(HEIGHTS);
  const times = new pc.AnimData(1, TIMES);
  // Positions have three components; only y moves.
  const positions = new pc.AnimData(3, y.flatMap((h) => [0, h, 0]));
  const intensities = new pc.AnimData(1, wrap(INTENSITY));
  const curves = [
    // entityPath starts at the entity that owns the anim component.
    new pc.AnimCurve([{ entityPath: ['beacon', 'cube'], component: 'graph', propertyPath: ['localPosition'] }], 0, 0, MODES[mode]),
    // component names a component instead of the transform, and propertyPath one of its properties.
    new pc.AnimCurve([{ entityPath: ['beacon', 'cube', 'lamp'], component: 'light', propertyPath: ['intensity'] }], 0, 1, MODES[mode]),
  ];
  return new pc.AnimTrack('bob', 2, [times], [positions, intensities], curves);
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, sun: { intensity: 0.15 }, ambient: '#1a1c24', orbit: { distance: 8, pitch: -18, target: new pc.Vec3(0, 1, 0) } });
  const { app } = scene;

  // The beacon is the root of the hierarchy the clip animates: a glowing cube with a lamp inside.
  const beacon = new pc.Entity('beacon');
  app.root.addChild(beacon);
  const glow = material('#ffffff', { emissive: '#ff8c33' });
  const cube = addShape(beacon, 'box', glow, [0, 0.4, 0], 0.9, 'cube');
  const lamp = new pc.Entity('lamp');
  lamp.addComponent('light', { type: 'omni', color: new pc.Color(1, 0.55, 0.2), range: 7 });
  cube.addChild(lamp);

  beacon.addComponent('anim', { activate: true });
  beacon.anim!.assignAnimation('bob', buildClip('linear'));

  // A trail of dots shows where the cube has been.
  const dots: pc.Entity[] = [];
  const dotMat = material('#ff8c33', { emissive: '#ff8c33' });
  for (let i = 0; i < 40; i++) dots.push(addShape(app.root, 'sphere', dotMat, [0, -9, 0], 0.12, 'dot'));
  let n = 0;
  let acc = 0;
  app.on('update', (dt: number) => {
    acc += dt;
    if (acc < 0.05) return;
    acc = 0;
    const p = cube.getPosition();
    dots[n++ % dots.length]!.setPosition(2.2 + ((n % dots.length) / dots.length) * 3, p.y, 0);
  });

  if (ctx.preview) {
    let t = 0;
    let i = 0;
    const modes: Mode[] = ['linear', 'step', 'cubic'];
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 4) {
        t = 0;
        beacon.anim!.assignAnimation('bob', buildClip(modes[++i % modes.length]!));
      }
    });
  } else {
    const panel = createPanel(el);
    panel.select('interpolation', ['linear', 'step', 'cubic'] as const, 'linear', (m) => beacon.anim!.assignAnimation('bob', buildClip(m)));
    panel.slider('component speed', 0.1, 2, 0.1, 1, (v) => (beacon.anim!.speed = v));
    panel.readout('Five keyframes drive the cube height and the lamp intensity; the interpolation decides what happens between them.');
  }
  return () => scene.dispose();
};

export default mount;
