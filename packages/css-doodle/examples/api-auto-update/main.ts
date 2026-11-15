// AutoUpdate(interval) re-renders on a timer; cancelAutoUpdate() stops it
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 8 / 100% / #222 _2px;
    background: @p(#ffbe0b, #fb5607, #ff006e, #8338ec, #3a86ff);
    transition: .4s;
    scale: @r(.2, 1);
  `);

  let renders = 0;
  doodle.addEventListener('update', () => {
    renders++;
    // autoUpdate() keeps its interval in data-interval.
    const every = doodle.dataset['interval'];
    stage.say(every ? `autoUpdate('${every}') · ${renders} updates` : 'cancelled');
  });

  doodle.autoUpdate('1.2s');
  if (stage.bar) {
    // A number is milliseconds; a string may use ms, s or m. The minimum is 500.
    select<string | number>(stage.bar, 'interval', [['500ms', '500ms'], ['1.2s', '1.2s'], [3000, '3000'], ['5s', '5s']], (v) => doodle.autoUpdate(v), '1.2s');
    button(stage.bar, 'cancelAutoUpdate()', () => {
      doodle.cancelAutoUpdate();
      stage.say('cancelAutoUpdate(): timer stopped, data-interval removed');
    });
  }
  return () => stage.dispose();
};

export default mount;
