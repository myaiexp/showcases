// SplatMesh.maxSh with hand-written first-order spherical harmonics in extra.sh1
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, select } from '../../shared/controls.ts';
import { pushShSphere } from './sphere.ts';

const LEVELS = ['0', '1', '2', '3'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 4.2], orbit: ctx.preview ? 0.5 : 0.35 });
  const count = ctx.preview ? 9000 : 14000;
  // Two identical spheres, both carrying sh1 data: one has SH switched off.
  const plain = new SplatMesh({ constructSplats: (splats) => pushShSphere(splats, count) });
  const lit = new SplatMesh({ constructSplats: (splats) => pushShSphere(splats, count) });
  plain.position.x = -1;
  lit.position.x = 1;
  plain.maxSh = 0;
  stage.scene.add(plain, lit);

  const label = overlay(el, 'stays grey: maxSh 0\ntints with view: maxSh 3');

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(
      bar,
      'tinted sphere maxSh',
      LEVELS,
      (v) => {
        lit.maxSh = Number(v);
        // maxSh changes the compiled pipeline, so tell the mesh to rebuild it.
        lit.updateGenerator();
        label.textContent = `stays grey: maxSh 0\ntints with view: maxSh ${v}`;
      },
      '3',
    );
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
