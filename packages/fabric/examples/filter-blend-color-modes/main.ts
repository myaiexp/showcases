// Image filters: BlendColor with its ten blend modes, colour and alpha
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { color, select, slider } from '../../shared/controls.ts';
import { cycle, filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const MODES: filters.TBlendMode[] = [
  'multiply', 'add', 'difference', 'screen', 'subtract', 'darken', 'lighten', 'overlay', 'exclusion', 'tint',
];

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'landscape');
  const say = status(stage);

  // The colour is blended into every pixel by `mode`; alpha (0..1) scales how much of it is used.
  const blend = new filters.BlendColor({ color: '#3fa7ff', mode: 'tint', alpha: 0.6 });
  const update = (): void => {
    show([blend]);
    say(`${blend.mode}, alpha ${blend.alpha.toFixed(2)}`);
  };
  update();

  if (stage.bar) {
    select(stage.bar, 'mode', MODES, (m) => {
      blend.mode = m;
      update();
    }, 'tint');
    color(stage.bar, 'color', '#3fa7ff', (v) => {
      blend.color = v;
      update();
    });
    slider(stage.bar, 'alpha', 0, 1, 0.01, 0.6, (v) => {
      blend.alpha = v;
      update();
    }, (v) => v.toFixed(2));
  } else {
    blend.alpha = 1;
    cycle(stage, MODES, (m) => {
      blend.mode = m;
      update();
    }, 1000);
  }
  return stage.dispose;
};

export default mount;
