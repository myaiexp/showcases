// Bounds: growing and shrinking a box by one to four numbers
import { Bounds, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cornersOf, outlineOf } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey is the original bounds. Blue is the result of spread() or shrink() with the chosen form.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const base = new Bounds(stage.width * 0.3, stage.height * 0.3, stage.width * 0.4, stage.height * 0.3);
  outlineOf(leafer, '#999').set(cornersOf(base));
  const result = outlineOf(leafer, '#4B8BFF', 'rgba(75,139,255,0.12)');
  const say = label(stage, '', true);

  let form: 'one number' | 'two numbers' | 'four numbers' = 'one number';
  let mode: 'spread' | 'shrink' = 'spread';
  let n = 20;
  const run = (): void => {
    const arg = form === 'one number' ? n : form === 'two numbers' ? [n, n * 2] : [n, n * 2, n / 2, n * 1.5];
    const b = base.clone()[mode](arg as never);
    result.set(cornersOf(b));
    say(`bounds.${mode}(${JSON.stringify(arg)})`);
  };
  pick(stage, 'form', ['one number', 'two numbers', 'four numbers'] as const, (f) => ((form = f), run()), 2600);
  pick(stage, 'method', ['spread', 'shrink'] as const, (m) => ((mode = m), run()), 7800);
  drive(stage, 'n', [0, 40, 1], 20, (v) => ((n = v), run()), 5);
  return stage.dispose;
};

export default mount;
