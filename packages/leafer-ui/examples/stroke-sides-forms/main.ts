// Stroke sides: array forms of strokeWidth
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a form.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '');

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S * 1.3, S), width: S * 1.3, height: S, fill: '#32cd79', stroke: '#1d4e89' });
  leafer.add(rect);

  const forms = [
    [[20, 10, 20, 10], '[top, right, bottom, left]'],
    [[20, 10, 20], '[top, (right-left), bottom]'],
    [[20, 10], '[(top-bottom), (right-left)]'],
    [20, 'all four sides'],
  ] as const;
  const names = forms.map((f) => JSON.stringify(f[0]));
  pick(stage, 'strokeWidth', names, (v) => {
    const form = forms[names.indexOf(v)]!;
    rect.strokeWidth = form[0] as number | number[];
    say(`strokeWidth: ${v}\n${form[1]}`);
  }, 1800);

  return stage.dispose;
};

export default mount;
