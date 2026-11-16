// Appearance: linear gradient direction with from and to aligns
import { Leafer, Rect, type IAlign } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { cycle, label } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Choose where the gradient starts and ends." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const aligns: IAlign[] = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', 'center'];
  let from: IAlign = 'top';
  let to: IAlign = 'bottom';
  const say = label(stage, '', true);
  const paint = (): void => {
    rect.fill = { type: 'linear', from, to, stops: [{ offset: 0, color: '#FEB027' }, { offset: 1, color: '#79CB4D' }] };
    say("from: '" + from + "'  to: '" + to + "'");
  };
  paint();
  if (stage.bar) {
    select(stage.bar, 'from', aligns, (v) => ((from = v), paint()), from);
    select(stage.bar, 'to', aligns, (v) => ((to = v), paint()), to);
  } else {
    const pairs: [IAlign, IAlign][] = [['top', 'bottom'], ['top-left', 'bottom-right'], ['left', 'right'], ['bottom-right', 'top']];
    cycle(stage, pairs, ([f, t]) => ((from = f), (to = t), paint()), 1600);
  }

  return stage.dispose;
};

export default mount;
