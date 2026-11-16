// Bounds: aligning one box inside another
import { Bounds, Leafer, Rect } from 'leafer-ui';
import type { IAlign } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { select } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const ALIGNS: IAlign[] = ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'center'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed frame is the Bounds; the green box is put into it. Choose the alignment and the scale mode.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const host = new Bounds(30, 20, stage.width - 60, stage.height - 70);
  leafer.add(new Rect({ ...host.get(), stroke: '#999', strokeWidth: 2, dashPattern: [6, 5], hittable: false }));
  const box = new Rect({ fill: GREEN, cornerRadius: 6 });
  leafer.add(box);
  const say = label(stage, '', true);

  let align: IAlign = 'top-left';
  let scale: number | 'fit' | 'cover' = 1;
  const run = (): void => {
    const put = { x: 0, y: 0, width: host.width * 0.45, height: host.height * 0.3 };
    host.put(put, align, scale); // changes put's x, y and size
    box.set(put);
    say(`host.put(box, '${align}', ${typeof scale === 'string' ? `'${scale}'` : scale})`);
  };
  pick(stage, 'align', ALIGNS, (a) => ((align = a), run()), 1300);
  if (stage.bar) select(stage.bar, 'putScale', ['1', '0.5', 'fit', 'cover'] as const, (v) => ((scale = v === 'fit' || v === 'cover' ? v : Number(v)), run()), '1');
  return stage.dispose;
};

export default mount;
