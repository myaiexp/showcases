// WatchEvent: one data event for a burst of changes
import { Leafer, Rect, WatchEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each click changes a few of the five squares at once; watch.data reports them together, once.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 5 : 8);
  const s = Math.min(34, (stage.width - 40) / 5 - 8);
  const rects = Array.from({ length: 5 }, (_, i) => new Rect({ name: `r${i + 1}`, x: 20 + i * (s + 8), y: stage.height - s - 24, width: s, height: s, fill: GREEN, cornerRadius: 6 }));
  leafer.add(rects);

  leafer.on(WatchEvent.DATA, (e: WatchEvent) => {
    const list = e.data.updatedList.list as { name?: string }[];
    log(`watch.data: ${list.length} changed  [${list.map((l) => l.name || '?').join(' ')}]`);
  });
  let n = 0;
  const burst = (): void => {
    n++;
    const picks = rects.filter((_, i) => (n + i) % 2 === 0 || i === 4);
    for (const r of picks) r.fill = n % 2 ? '#4B8BFF' : GREEN;
  };
  if (stage.bar) button(stage.bar, 'change several', burst);
  else stage.every(1600, burst);
  return stage.dispose;
};

export default mount;
