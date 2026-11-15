// MathUtil conversions, clamp, lerp and isPowerOf2 driving a sweeping ball
import { MathUtil, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The raw angle can go past the limits; clamp holds the amber ball inside them, lerp eases the cyan ball toward it.' });
  const { engine, root } = stage;
  lit(stage, [0, 1, 10]);
  const raw = solid(root, PrimitiveMesh.createSphere(engine, 0.22, 12), unlit(engine, PALETTE.grey));
  const clamped = solid(root, PrimitiveMesh.createSphere(engine, 0.35, 16), phong(engine, PALETTE.amber));
  const eased = solid(root, PrimitiveMesh.createSphere(engine, 0.28, 16), phong(engine, PALETTE.cyan));
  for (const a of [-60, 60]) {
    const r = MathUtil.degreeToRadian(a);
    solid(root, PrimitiveMesh.createCuboid(engine, 0.05, 0.6, 0.05), unlit(engine, PALETTE.red), [Math.sin(r) * 4, Math.cos(r) * 4, 0]);
  }
  const info = panel(stage);
  let limit = 60;
  if (!stage.preview) slider(stage.bar, 'clamp limit (deg)', 10, 120, 5, limit, (v) => (limit = v));
  let smooth = 0;
  const place = (e: { transform: { setPosition(x: number, y: number, z: number): void } }, deg: number, radius: number): void => {
    const r = MathUtil.degreeToRadian(deg);
    e.transform.setPosition(Math.sin(r) * radius, Math.cos(r) * radius, 0);
  };
  tick(root, (dt, t) => {
    const angle = Math.sin(t * 0.8) * 100;
    const held = MathUtil.clamp(angle, -limit, limit);
    smooth = MathUtil.lerp(smooth, held, Math.min(1, dt * 4));
    place(raw, angle, 4);
    place(clamped, held, 4);
    place(eased, smooth, 3.4);
    const size = Math.round(2 ** (1 + Math.floor(t) % 6));
    info.text(
      `angle ${angle.toFixed(0)} deg = ${MathUtil.degreeToRadian(angle).toFixed(3)} rad  (${MathUtil.radianToDegree(MathUtil.degreeToRadian(angle)).toFixed(0)} deg back)\n` +
        `clamp(angle, -${limit}, ${limit}) = ${held.toFixed(0)}\nlerp(smooth, held, 4 dt) = ${smooth.toFixed(1)}\nisPowerOf2(${size}) ${MathUtil.isPowerOf2(size)}   isPowerOf2(${size + 1}) ${MathUtil.isPowerOf2(size + 1)}`,
    );
  });
  return stage.dispose;
};

export default mount;
