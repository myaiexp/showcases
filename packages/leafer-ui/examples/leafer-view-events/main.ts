// LeaferEvent: the view events of a viewport leafer
import { Leafer, LeaferEvent, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each change edits the leafer itself (the view), not an element; zoom and pan with the wheel also report.' });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'viewport' }));
  const log = logger(stage, stage.preview ? 6 : 10);
  leafer.add(new Rect({ x: stage.width * 0.35, y: stage.height * 0.55, width: 70, height: 50, fill: GREEN, cornerRadius: 8 }));

  let fired: string[] = [];
  for (const type of [LeaferEvent.TRANSFORM, LeaferEvent.MOVE, LeaferEvent.SCALE, LeaferEvent.ROTATE, LeaferEvent.SKEW]) {
    leafer.on(type, () => fired.push(type.replace('leafer.', '')));
  }
  const edits: Record<string, () => void> = {
    'leafer.x += 20': () => (leafer.x = (leafer.x ?? 0) + 20),
    'leafer.scale': () => (leafer.scale = leafer.scaleX === 1 ? 1.3 : 1),
    'leafer.rotation': () => (leafer.rotation = leafer.rotation ? 0 : 15),
    'leafer.skewX': () => (leafer.skewX = leafer.skewX ? 0 : 12),
  };
  pick(stage, 'edit', Object.keys(edits), (name) => {
    fired = [];
    edits[name]!();
    stage.after(100, () => log(`${name}  ->  ${[...new Set(fired)].join(', ') || 'none'}`));
  }, 2000);
  return stage.dispose;
};

export default mount;
