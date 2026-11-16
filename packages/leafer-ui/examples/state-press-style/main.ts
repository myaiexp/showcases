// Interaction: pressStyle with a darker fill and a smaller scale
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/state';
import '@leafer-in/animate';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Press and hold the rect." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const p = mid(stage, S);
  const rect = new Rect({
    ...p,
    width: S,
    height: S,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    origin: 'center',
    transition: 0.15,
    pressStyle: { fill: 'rgba(50,205,121, 1)', scale: 0.9 },
  });
  leafer.add(rect);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      await ghost.glide(p.x + S / 2, p.y + S / 2, 500);
      await stage.wait(500);
      ghost.down();
      await stage.wait(900);
      ghost.up();
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
