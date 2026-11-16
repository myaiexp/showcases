// Data: setAttr, getAttr and getComputedAttr
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'setAttr writes one property. getAttr reads what you set, or else the default; getComputedAttr reads the final value only.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  // no fill, no rotation, no width: they all come from defaults until set
  const base = { x: stage.width / 2, y: stage.height / 2 - 14, height: S, stroke: '#32cd79', strokeWidth: 4, around: 'center' } as const;
  const rect = new Rect(base);
  leafer.add(rect);
  const show = label(stage, '', true);
  const refresh = (): void =>
    show(
      ['width', 'rotation', 'fill'].map((k) => `${k.padEnd(9)} getAttr ${JSON.stringify(rect.getAttr(k as 'width'))}   getComputedAttr ${JSON.stringify(rect.getComputedAttr(k as 'width'))}   get ${JSON.stringify(rect.get(k as 'width'))}`).join('\n'),
    );
  refresh();
  const steps: (() => void)[] = [
    () => rect.setAttr('width', S),
    () => rect.setAttr('rotation', 20),
    () => rect.setAttr('fill', '#32cd79'),
    () => rect.reset(base),
  ];
  let i = 0;
  const next = (): void => {
    steps[i]!();
    i = (i + 1) % steps.length;
    refresh();
  };
  if (stage.bar) button(stage.bar, 'next step', next);
  else stage.every(1500, next);

  return stage.dispose;
};

export default mount;
