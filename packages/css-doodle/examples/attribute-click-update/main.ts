// click:update redraws on every click; cards call click() on a timer
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the doodle.' });
  const doodle = stage.doodle(
    `
    @grid: 4 / 100% _5px ^-10px;
    transition: .2s;
    outline: 5px solid #e6437d;
    border-radius: @p.cycle(100% 0 0 0);
  `,
    { attrs: { 'click:update': '' } },
  );
  if (stage.preview) stage.every(1600, () => doodle.click());
  else if (stage.bar) {
    checkbox(stage.bar, 'click:update', true, (on) => {
      if (on) doodle.setAttribute('click:update', '');
      else doodle.removeAttribute('click:update');
      stage.say(on ? 'Each click draws with a new seed' : 'Attribute removed: clicks do nothing');
    });
  }
  stage.say('Each click draws with a new seed');
  return () => stage.dispose();
};

export default mount;
