// beforeUpdate records the outgoing seed; Back restores it
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 8 / 100% / #fefae0;
    background: #283618;
    clip-path: polygon(@p(
      '0 0, 100% 0, 100% 100%',
      '0 0, 100% 100%, 0 100%',
      '50% 0, 100% 50%, 50% 100%, 0 50%'
    ));
  `);

  // The seed of the picture about to be replaced is still readable here.
  const history: string[] = [];
  doodle.addEventListener('beforeUpdate', () => {
    if (doodle.seed) history.push(doodle.seed);
  });
  const show = (): void => stage.say(`history: ${history.length} seeds · showing ${doodle.seed}`);
  doodle.addEventListener('render', show);

  const next = (): void => {
    doodle.removeAttribute('seed');
    doodle.update();
  };
  const back = (): void => {
    const seed = history.pop();
    if (!seed) return;
    doodle.seed = seed; // re-renders (and fires beforeUpdate, which records the current one)
    history.pop(); // so drop that record again
  };
  if (stage.bar) {
    button(stage.bar, 'Next', next);
    button(stage.bar, 'Back', back);
  } else {
    // Forward three times, back three times.
    let n = 0;
    stage.every(1100, () => (n++ % 6 < 3 ? next() : back()));
  }
  return () => stage.dispose();
};

export default mount;
