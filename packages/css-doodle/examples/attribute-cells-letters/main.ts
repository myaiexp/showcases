// cells="#wave::letters" makes every letter of a heading a cell that bobs
import type { Mount } from '@/types.ts';
import { paper } from '../../shared/a-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const wave = paper(stage, 'cd-cells-wave', 'css-doodle', 'p');
  stage.doodle(
    `
    display: inline-block;
    font: 700 ${stage.preview ? '1.4rem' : '2rem'} sans-serif;
    animation: up .6s infinite alternate ease-in-out;
    animation-delay: calc(@i * -.1s);
    @keyframes up {
      to { translate: 0 -.3em; }
    }
  `,
    { attrs: { cells: '#cd-cells-wave::letters' }, frame: 'free', parent: wave.parentElement! },
  );
  stage.say('One cell per letter; the delay comes from @i');
  return () => stage.dispose();
};

export default mount;
