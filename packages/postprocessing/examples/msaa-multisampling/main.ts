// EffectComposer multisampling: hardware MSAA on the composer's frame buffers
import { CopyPass, EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { AA_STAGE, wireCage } from '../../shared/aliasing.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  // The renderer itself has antialias: false; the composer's buffers are the multisampled ones.
  const composer = stage.own(new EffectComposer(stage.renderer, { multisampling: 0 }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // A RenderPass that is last renders straight to the canvas, bypassing the multisampled buffer.
  // A CopyPass after it resolves the buffer onto the screen.
  composer.addPass(new CopyPass());

  const label = overlay(stage.box);
  const apply = (samples: number): void => {
    // The setter falls back to the renderer's maximum when it is lower than the request.
    composer.multisampling = samples;
    label.textContent = `multisampling ${composer.multisampling}`;
  };
  apply(0);

  const options = ['0', '2', '4', '8'] as const;
  if (stage.bar) {
    select(stage.bar, 'multisampling', options, (v) => apply(Number(v)), '0');
  } else {
    let i = 0;
    stage.every(1800, () => apply(Number(options[++i % options.length])));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
