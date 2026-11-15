// @content: @doodle(…) inserts a real <css-doodle>, so its cells stay elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @grid: 1 / 100% / #f5f5f0;
    @content: @doodle(
      @grid: 5 / 100%;
      background: #000;
      clip-path: polygon(@m3.M2.r(100%));
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(code);
  stage.reroll(doodle);
  doodle.addEventListener('render', () => {
    const inner = doodle.shadowRoot!.querySelector('css-doodle');
    stage.say(inner ? `inside: a <css-doodle> with ${inner.shadowRoot!.querySelectorAll('cell').length} cells` : 'inside: an image');
  });
  return () => stage.dispose();
};

export default mount;
