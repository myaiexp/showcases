// define() registers css-doodle's element class under a tag name of your own
import { CSSDoodle, define } from 'css-doodle/component';
import type { Mount } from '@/types.ts';
import { framed } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

// Tag names are page-wide and permanent; define() skips a name that is taken,
// so mounting this example again is harmless.
define('showcase-doodle', class extends CSSDoodle {});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = document.createElement('showcase-doodle') as HTMLElement & { update(): void };
  doodle.textContent = `
    @grid: 6 / 100% / #14213d _3px;
    background: @p(#fca311, #e5e5e5);
    border-radius: @p(50%, 0, 50% 0);
    transition: .5s;
  `;
  framed(stage.root, doodle, '<showcase-doodle>');

  if (ctx.preview) stage.every(2200, () => doodle.update());
  stage.say(`${doodle.tagName.toLowerCase()} is a ${customElements.get('showcase-doodle') ? 'registered' : 'missing'} element`);
  return () => stage.dispose();
};

export default mount;
