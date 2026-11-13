// falloff: the Gaussian kernel blended toward flat-shaded discs, swept live
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pushBlobShell, pingPong } from '../../renderer-kit/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, 3], spark: { falloff: 1 }, orbit: 0.2 });
  stage.scene.add(new SplatMesh({ constructSplats: (s) => pushBlobShell(s, { count: ctx.preview ? 350 : 500, scale: 0.11 }) }));
  const label = overlay(el);

  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'falloff', 0, 1, 0.01, 1, (v) => {
      auto = false;
      stage.spark.falloff = v;
    });
  }

  stage.run((time) => {
    // 1 is the normal Gaussian; 0 is a flat-shaded disc with a hard edge.
    if (auto) stage.spark.falloff = pingPong(time, 8);
    label.textContent = `falloff ${stage.spark.falloff.toFixed(2)}`;
  });
  return () => stage.dispose();
};

export default mount;
