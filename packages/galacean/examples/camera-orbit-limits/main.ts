// OrbitControl min/max polar and azimuth angles and distances
import { PrimitiveMesh } from '@galacean/engine';
import { OrbitControl } from '@galacean/engine-toolkit-controls';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const deg = (v: number): string => `${v.toFixed(0)}°`;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 2.5, 7], hint: 'Angles are radians in the API; the sliders show degrees.' });
  const say = caption(stage);
  floor(root, engine, -1);
  add(root, PrimitiveMesh.createCuboid(engine, 1.5, 1.5, 1.5), pbr(engine, [0.4, 0.6, 0.95], 0, 0.5));
  const c = camera.entity.addComponent(OrbitControl);
  c.minDistance = 4;
  c.maxDistance = 12;
  c.minPolarAngle = Math.PI * 0.2;
  c.maxPolarAngle = Math.PI * 0.55;
  c.minAzimuthAngle = -Math.PI / 3;
  c.maxAzimuthAngle = Math.PI / 3;
  const radians = (d: number): number => (d * Math.PI) / 180;
  if (stage.preview) {
    c.autoRotate = true;
    c.autoRotateSpeed = 0.8;
    tick(camera.entity, (_dt, t) => {
      const limit = Math.PI / 4 + (Math.PI / 6) * Math.sin(t * 0.5);
      c.minAzimuthAngle = -limit;
      c.maxAzimuthAngle = limit;
      say(`azimuth limits ±${deg((limit * 180) / Math.PI)}`);
    });
  } else {
    const pair = (label: string, lo: number, hi: number, set: (a: number, b: number) => void, min: number, max: number): void => {
      let a = lo;
      let b = hi;
      slider(stage.bar, `min ${label}`, min, max, 1, lo, (v) => set((a = v), b), deg);
      slider(stage.bar, `max ${label}`, min, max, 1, hi, (v) => set(a, (b = v)), deg);
    };
    pair('azimuth', -60, 60, (a, b) => ((c.minAzimuthAngle = radians(a)), (c.maxAzimuthAngle = radians(b))), -180, 180);
    pair('polar', 36, 99, (a, b) => ((c.minPolarAngle = radians(a)), (c.maxPolarAngle = radians(b))), 1, 179);
    slider(stage.bar, 'max distance', 5, 20, 0.5, 12, (v) => (c.maxDistance = v));
  }
  return stage.dispose;
};

export default mount;
