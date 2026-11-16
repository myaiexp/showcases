// Image filters: Saturation and Vibrance on one portrait, one slider
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx, ctx.preview ? undefined : ['original', 'Saturation', 'Vibrance']);
  const say = status(stage);
  const shots = stage.panes.map((pane) => shot(stage, 'portrait', pane));

  // Both options run -1..1. Saturation scales every colour the same; Vibrance acts harder on dull ones.
  const saturation = new filters.Saturation();
  const vibrance = new filters.Vibrance();
  let cardFilter: 'Saturation' | 'Vibrance' = 'Saturation';
  const set = (v: number): void => {
    saturation.saturation = v;
    vibrance.vibrance = v;
    if (stage.bar) {
      shots[1]!.show([saturation]);
      shots[2]!.show([vibrance]);
      say(`saturation = vibrance = ${v.toFixed(2)}`);
    } else {
      shots[0]!.show([cardFilter === 'Saturation' ? saturation : vibrance]);
      say(`${cardFilter} ${v.toFixed(2)}`);
    }
  };
  set(0.9);

  if (stage.bar) slider(stage.bar, 'amount', -1, 1, 0.01, 0.9, set, (v) => v.toFixed(2));
  else {
    // The card has one pane: it runs the sweep with Saturation, then again with Vibrance.
    sweep(stage, -1, 1, set, 4);
    stage.every(4000, () => {
      cardFilter = cardFilter === 'Saturation' ? 'Vibrance' : 'Saturation';
    });
  }
  return stage.dispose;
};

export default mount;
