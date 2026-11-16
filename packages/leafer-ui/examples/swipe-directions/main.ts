// SwipeEvent: four directions of a short, quick drag
import { Leafer, Rect, SwipeEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Swipe across the card in any direction (a quick flick of more than 20 px).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, 4);
  const w = stage.width * 0.5;
  const h = stage.height * 0.5;
  const home = { x: (stage.width - w) / 2, y: stage.height - h - 12 };
  const card = new Rect({ ...home, width: w, height: h, fill: '#32cd79', cornerRadius: 14 });
  leafer.add(card);

  const dirs = { [SwipeEvent.LEFT]: ['#4B8BFF', -1, 0], [SwipeEvent.RIGHT]: ['#feb027', 1, 0], [SwipeEvent.UP]: ['#ff4b4b', 0, -1], [SwipeEvent.DOWN]: ['#a259ff', 0, 1] } as const;
  for (const [type, [color, dx, dy]] of Object.entries(dirs)) {
    card.on(type, () => {
      card.fill = color;
      card.set({ x: home.x + dx * 24, y: home.y + dy * 18 });
      log(type);
      stage.after(500, () => card.set({ ...home, fill: '#32cd79' }));
    });
  }

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: home.x + w / 2, y: home.y + h / 2 };
    script(stage, async () => {
      for (const [dx, dy] of [[-60, 0], [60, 0], [0, -50], [0, 50]] as const) {
        await ghost.drag(c, { x: c.x + dx, y: c.y + dy }, 150);
        await stage.wait(800);
      }
    });
  }
  return stage.dispose;
};

export default mount;
