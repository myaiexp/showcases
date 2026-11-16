// Resource: parallel tasks versus a one-at-a-time queue
import { Leafer, Rect, Resource } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each bar is one 500 ms task. Parallel tasks overlap; queued ones follow each other.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);
  const rowH = stage.preview ? 16 : 22;
  const left = 60;
  const scale = (stage.width - left - 20) / 2400; // px per ms over a 2.4 s window
  const bars: Rect[] = [];
  let t0 = 0;
  const mark = (row: number, start: number, end: number, color: string): void => {
    const bar = new Rect({ x: left + start * scale, y: 40 + row * (rowH + 4), width: Math.max(2, (end - start) * scale), height: rowH, fill: color, cornerRadius: 4, hittable: false });
    bars.push(bar);
    leafer.add(bar);
  };
  const wait = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

  const run = (): void => {
    bars.splice(0).forEach((b) => b.destroy());
    t0 = performance.now();
    say('Resource.tasker.add(...) x3     Resource.queue.add(...) x3');
    for (let i = 0; i < 3; i++) {
      Resource.tasker.add(async () => {
        const s = performance.now() - t0;
        await wait(500);
        if (!stage.disposed) mark(i, s, performance.now() - t0, '#32cd79');
      });
      Resource.queue.add(async () => {
        const s = performance.now() - t0;
        await wait(500);
        if (!stage.disposed) mark(3 + i, s, performance.now() - t0, '#4B8BFF');
      });
    }
  };
  run();
  if (stage.bar) button(stage.bar, 'run again', run);
  else stage.every(3600, run);
  return stage.dispose;
};

export default mount;
