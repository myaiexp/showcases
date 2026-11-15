// raycast(ray, distance, layerMask, hitResult): the ray ignores other layers
import { HitResult, Layer, Ray, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { line, marker, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { PALETTE, wall, world } from '../../shared/phys-kit.ts';

const LAYERS = [Layer.Layer1, Layer.Layer2, Layer.Layer3] as const;
const COLORS = [PALETTE.red, PALETTE.green, PALETTE.blue];
const MASKS: [string, number][] = [
  ['Layer.Everything', Layer.Everything],
  ['Layer.Layer1', Layer.Layer1],
  ['Layer.Layer2', Layer.Layer2],
  ['Layer.Layer1 | Layer.Layer2', Layer.Layer1 | Layer.Layer2],
  ['Layer.Layer3', Layer.Layer3],
];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 11], target: [0, 1.2, 0], hint: 'Walls from left to right: Layer1 (red), Layer2 (green), Layer3 (blue).' });
  LAYERS.forEach((layer, i) => {
    const p = wall(w.root, [-2.6 + i * 2.6, 1.2, 0], [0.5, 2.4, 2], COLORS[i]!, `wall Layer${i + 1}`);
    p.collider.collisionLayer = layer;
  });
  const beam = line(w.root, unlit(w.engine, PALETTE.white), 0.07);
  const dot = marker(w.root, unlit(w.engine, PALETTE.amber), 0.4);
  const ray = new Ray(new Vector3(-6, 1.2, 0), new Vector3(1, 0, 0));
  const hit = new HitResult();
  const end = new Vector3();
  let manual: number | undefined;
  const bits = [true, true, true];
  tick(w.root, (_dt, t) => {
    const [label, mask] = manual === undefined ? MASKS[Math.floor(t / 2.5) % MASKS.length]! : ['custom', manual];
    const found = w.physics.raycast(ray, 20, mask as Layer, hit);
    end.set(found ? hit.point.x : 7, 1.2, 0);
    beam.set(ray.origin, end);
    dot.entity.isActive = found;
    if (found) dot.set(hit.point);
    w.say(`layerMask = ${label}\n-> ${found ? hit.entity.name : 'no hit'}`);
  });
  if (!w.stage.preview) {
    LAYERS.forEach((layer, i) =>
      checkbox(w.stage.bar, `Layer${i + 1}`, true, (v) => {
        bits[i] = v;
        manual = LAYERS.reduce((m, l, j) => (bits[j] ? m | l : m), 0);
      }),
    );
  }
  return w.stage.dispose;
};

export default mount;
