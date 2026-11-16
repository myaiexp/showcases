// BoundsEvent: which of the four events each kind of change triggers
import { BoundsEvent, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rect sits in a group. Each change fires only some of the bounds events on the rect.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 6 : 10);
  const group = new Group({ x: 10, y: 10 });
  const s = Math.min(stage.width * 0.25, stage.height * 0.3);
  const rect = new Rect({ x: 20, y: stage.height - s - 20, width: s, height: s, fill: GREEN, cornerRadius: 8 });
  group.add(rect);
  leafer.add(group);

  let fired: string[] = [];
  for (const type of [BoundsEvent.RESIZE, BoundsEvent.INNER, BoundsEvent.LOCAL, BoundsEvent.WORLD]) {
    rect.on(type, () => fired.push(type.replace('bounds.', '')));
  }
  const flush = (what: string): void => {
    stage.after(120, () => {
      log(`${what}  ->  ${[...new Set(fired)].join(', ') || 'none'}`);
      fired = [];
    });
  };
  const changes: Record<string, () => void> = {
    'rect.width +=': () => (rect.width = (rect.width ?? s) + 20),
    'rect.x +=': () => (rect.x = (rect.x ?? 0) + 15),
    'rect.scaleX *=': () => (rect.scaleX = (rect.scaleX ?? 1) * 1.15),
    'group.x +=': () => (group.x = (group.x ?? 0) + 10),
    'rect.fill (no bounds change)': () => (rect.fill = rect.fill === GREEN ? '#4B8BFF' : GREEN),
  };
  const reset = (): void => {
    rect.set({ x: 20, width: s, scaleX: 1 });
    group.x = 10;
  };
  pick(stage, 'change', Object.keys(changes), (name) => {
    reset();
    stage.after(150, () => {
      fired = [];
      changes[name]!();
      flush(name);
    });
  }, 2200);
  return stage.dispose;
};

export default mount;
