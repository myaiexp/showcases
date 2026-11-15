// An ASCIIEffect fed custom ASCIITextures with their own characters and font size
import { ASCIIEffect, ASCIITexture, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const SETS = {
  binary: ' 01',
  dots: ' .:oO@',
  slashes: ' /\\|-+#',
  letters: ' ilcoeAMW',
  digits: ' 1234567890',
} as const;
type SetName = keyof typeof SETS;
const NAMES = Object.keys(SETS) as SetName[];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const ascii = new ASCIIEffect({ cellSize: 14, color: '#9be7ff' });
  composer.addPass(new EffectPass(stage.camera, ascii));

  let name: SetName = 'binary';
  let fontSize = 48;
  const rebuild = (): void => {
    // 512 px atlas, 8 x 8 cells of 64 px: room for up to 64 characters. The old texture is disposed by the setter.
    ascii.asciiTexture = new ASCIITexture({ characters: SETS[name], font: 'monospace', fontSize, size: 512, cellCount: 8 });
  };
  rebuild();

  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    select(stage.bar, 'characters', NAMES, (n) => ((name = n), rebuild()));
    slider(stage.bar, 'fontSize', 24, 64, 2, fontSize, (v) => ((fontSize = v), rebuild()));
  }
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 2) % NAMES.length;
      if (s !== step) {
        step = s;
        name = NAMES[s]!;
        rebuild();
        label.textContent = `"${SETS[name]}"`;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
