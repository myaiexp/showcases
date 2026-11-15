// @spring(bounce): an easing that overshoots and settles, more per row
import '@css-doodle/addons/spring';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const code = `
    @use: spring;
    @grid: 1x5 / 100% / #f5f5f0;
    background: radial-gradient(
      closest-side, #1d3557 85%, #0000 90%
    ) 0 0 / 20% 100% no-repeat;
    animation: slide 2s @spring($((@y - 1) * .2)) infinite;
    @keyframes slide {
      from { translate: 0 }
      70%, to { translate: 50% }
    }
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  stage.doodle(code);
  stage.say('Top row: @spring(0) · bottom row: @spring(.8)');
  return () => stage.dispose();
};

export default mount;
