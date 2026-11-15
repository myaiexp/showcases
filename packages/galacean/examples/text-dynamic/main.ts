// Changing TextRenderer.text each frame: typewriter and counter
import { TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const LINE = 'Text is just a string property.';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await scene2d(el, ctx, { size: 4 });
  const type = root.createChild('typewriter').addComponent(TextRenderer);
  type.entity.transform.setPosition(0, 0.6, 0);
  type.fontSize = 40;
  const count = root.createChild('counter').addComponent(TextRenderer);
  count.entity.transform.setPosition(0, -0.7, 0);
  count.fontSize = 56;
  let restart = 0;
  tick(root, (_dt, t) => {
    const n = Math.floor((t - restart) * 12);
    type.text = `${LINE.slice(0, Math.min(n, LINE.length))}${n % 12 < 6 ? '|' : ' '}`;
    count.text = `frames ${String(Math.floor(t * 60)).padStart(5, '0')}`;
  });
  if (!stage.preview) button(stage.bar, 'retype', () => (restart = stage.engine.time.elapsedTime));
  return stage.dispose;
};

export default mount;
