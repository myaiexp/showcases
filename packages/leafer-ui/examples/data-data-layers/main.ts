// Data: the input data and the computed data of an element
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid } from '../../shared/shapes.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'get() only knows what you set (the input data); rect.width falls back to the default 100; __ holds the computed data.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const rect = new Rect({ ...mid(stage, S, S), fill: '#32cd79' });
  leafer.add(rect);
  const show = label(stage, '', true);
  const refresh = (): void =>
    show(
      [
        `rect.get('width')   ${JSON.stringify(rect.get('width'))}    input data`,
        `rect.width          ${rect.width}    input first, else the default`,
        `rect.__.width       ${rect.__.width}    computed data`,
        `rect.get()          ${JSON.stringify(rect.get())}`,
      ].join('\n'),
    );
  let sized = false;
  const apply = (on: boolean): void => {
    sized = on;
    rect.set({ width: on ? S : undefined, height: on ? S : undefined });
    refresh();
  };
  apply(false);
  if (stage.bar) {
    checkbox(stage.bar, 'width and height set', sized, apply);
  } else {
    stage.every(1600, () => apply(!sized));
  }

  return stage.dispose;
};

export default mount;
