// preBlurAmount grows splats; blurAmount grows them and compensates opacity
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, select, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { pingPong } from '../../renderer-kit/scenes.ts';

type Mode = 'preBlurAmount' | 'blurAmount';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3], orbit: 0.15, spark: { preBlurAmount: 0, blurAmount: 0 } });
  stage.scene.add(new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 12000 : 28000) }));
  const label = overlay(el);

  let mode: Mode = 'preBlurAmount';
  let value = 0;
  let auto = true;
  // Only one of the two is non-zero at a time, so each one's effect is seen on its own.
  const apply = (): void => {
    stage.spark.preBlurAmount = mode === 'preBlurAmount' ? value : 0;
    stage.spark.blurAmount = mode === 'blurAmount' ? value : 0;
  };

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'option', ['preBlurAmount', 'blurAmount'] as const, (m) => {
      auto = false;
      mode = m;
      apply();
    });
    slider(bar, 'amount', 0, 3, 0.05, 0, (v) => {
      auto = false;
      value = v;
      apply();
    });
  }

  stage.run((time) => {
    if (auto) {
      // 8 seconds per option, the amount easing 0 -> 2 -> 0.
      const slot = Math.floor(time / 8);
      mode = slot % 2 === 0 ? 'preBlurAmount' : 'blurAmount';
      value = pingPong(time, 8) * 2;
      apply();
    }
    label.textContent = `${mode} ${value.toFixed(2)}`;
  });
  return () => stage.dispose();
};

export default mount;
