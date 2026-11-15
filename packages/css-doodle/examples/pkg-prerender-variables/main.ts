// prerender() with a seed, attributes and the custom properties the doodle reads
import { prerender } from 'css-doodle/generator';
import type { Mount } from '@/types.ts';
import { codeBlock, framed, scriptlessFrame } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

// At build time there is no page to read --rule from, so it is passed in variables.
const RULES = [
  'background: @p(#e6437d, #ebbf4d)',
  'background: @p(#118ab2, #06d6a0); border-radius: 50%',
  'background: #ffd166; rotate: @r(90deg); scale: @r(.4, 1)',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // A frame with scripts off: the prerendered HTML paints on its own there.
  const host = scriptlessFrame(ctx.preview ? 130 : 240);
  framed(stage.root, host.el, "prerender('@grid: 6 / 100%;', …)", 'free');
  const pre = codeBlock(stage.root, ctx.preview, 200);

  const show = async (i: number): Promise<void> => {
    const { html } = await prerender('@grid: 6 / 100%;', {
      seed: 'cover',
      attributes: { use: 'var(--rule)' },
      variables: { '--rule': RULES[i]! },
    });
    if (stage.disposed) return;
    host.show(html);
    pre.textContent = `seed: 'cover'\nattributes: { use: 'var(--rule)' }\nvariables: { '--rule': '${RULES[i]}' }`;
  };
  let i = 0;
  await show(0);
  stage.every(2400, () => void show((i = (i + 1) % RULES.length)));
  stage.say('The same seed every time: only --rule changes');
  return () => stage.dispose();
};

export default mount;
