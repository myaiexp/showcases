// covSplats: non-uniform scale beside the default averaged scale
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { buildExtSplats } from './ext.ts';

const mount: Mount = (el, ctx) => {
  const { preview } = ctx;
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:4px';
  const left = document.createElement('div');
  const right = document.createElement('div');
  for (const side of [left, right]) {
    side.style.cssText = 'flex:1;min-width:0;position:relative';
    row.append(side);
  }
  el.append(row);
  const common = { height: 380, position: [0, 0.3, preview ? 7.5 : 5.6] as [number, number, number], orbit: 0.2 };
  const count = preview ? 8000 : 20000;

  // Left: the default. SplatMesh scale must stay uniform, so Spark averages a non-uniform one.
  const plain = createStage(left, ctx, common);
  const plainKnot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, count) });
  plain.scene.add(plainKnot);
  overlay(left, preview ? 'default' : 'default: scale averaged');

  // Right: covariance splats. The renderer stores a 3D covariance matrix per splat, which
  // needs ExtSplats for precision, and the mesh opts in with covSplats too.
  const cov = createStage(right, ctx, { ...common, orbit: false, spark: { covSplats: true, accumExtSplats: true } });
  const covKnot = new SplatMesh({
    extSplats: buildExtSplats((s) => pushTorusKnot(s, count)),
    covSplats: true,
  });
  cov.scene.add(covKnot);
  overlay(right, preview ? 'covSplats' : 'covSplats: true: scale applied');

  const scale = { x: 1.9, y: 0.5, z: 1 };
  let auto = true;
  if (!preview) {
    const bar = controlBar(el);
    for (const axis of ['x', 'y', 'z'] as const) {
      slider(bar, `scale.${axis}`, 0.2, 2.5, 0.05, scale[axis], (v) => {
        auto = false;
        scale[axis] = v;
      });
    }
  }

  plain.run((time) => {
    if (auto) {
      scale.x = 1.9 + Math.sin(time * 0.8) * 0.3;
      scale.y = 0.55 + Math.cos(time * 0.8) * 0.15;
    }
    plainKnot.scale.set(scale.x, scale.y, scale.z);
  });
  cov.run(() => {
    covKnot.scale.set(scale.x, scale.y, scale.z);
    // One camera drives both views.
    cov.camera.position.copy(plain.camera.position);
    cov.camera.quaternion.copy(plain.camera.quaternion);
  });
  return () => {
    plain.dispose();
    cov.dispose();
  };
};

export default mount;
