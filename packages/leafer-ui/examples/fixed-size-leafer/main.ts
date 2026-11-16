// Basics: a Leafer with a fixed width and height, its own fill, and a draggable rect
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green square. The canvas stays 600 × 300 (240 × 160 in the card).' });
  const width = stage.preview ? 240 : 600;
  const height = stage.preview ? 160 : 300;

  const leafer = stage.own(
    new Leafer({
      view: stage.view, // a div; window, a canvas or an element id work too
      width, // a fixed size: 0 would switch the Leafer to auto layout
      height,
      fill: '#333',
    }),
  );

  const rect = Rect.one({ fill: '#32cd79', draggable: true }, 100, 60);
  leafer.add(rect);

  if (stage.preview) {
    // No pointer in a card: drag the rect back and forth with the engine's own interaction.
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: 150, y: 110 }, { x: 60, y: 60 }, 700);
      await stage.wait(500);
      await ghost.drag({ x: 60, y: 60 }, { x: 150, y: 110 }, 700);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
