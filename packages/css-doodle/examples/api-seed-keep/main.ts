// Remember the seed of a render you like, set it later to get it back
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 9 / 100% / #f4f1ea;
    @size: @r(20%, 100%);
    margin: auto;
    background: #264653;
    border-radius: @p(50%, 0, 50% 0);
    rotate: @r(360deg);
  `);

  if (stage.bar) {
    const list = document.createElement('div');
    list.className = 'cd-bar';
    stage.bar.after(list);
    button(stage.bar, 'New seed', () => {
      doodle.removeAttribute('seed'); // without a seed attribute, update() picks a new one
      doodle.update();
    });
    button(stage.bar, 'Keep this seed', () => {
      const seed = doodle.seed!; // the seed of the current picture, as a string
      button(list, seed, () => (doodle.seed = seed)); // setting it writes the attribute and re-renders
    });
  } else {
    // Three new pictures, then back to the first seed: the same picture returns.
    let first = '';
    stage.play(async (wait) => {
      doodle.removeAttribute('seed');
      doodle.update();
      first = doodle.seed!;
      stage.say(`kept seed ${first}`);
      for (let i = 0; i < 2; i++) {
        await wait(1100);
        doodle.update();
        stage.say(`seed ${doodle.seed}`);
      }
      await wait(1100);
      doodle.seed = first;
      stage.say(`doodle.seed = '${first}': same picture again`, 'ok');
      await wait(1600);
    });
  }
  return () => stage.dispose();
};

export default mount;
