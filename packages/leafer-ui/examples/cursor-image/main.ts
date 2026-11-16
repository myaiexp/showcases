// Interaction: an image cursor with x and y offsets
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cursorUrl } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the shape; slide the hot spot offset." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const polygon = new Polygon({
    ...mid(stage, S),
    width: S,
    height: S,
    points: [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90, 100, 90, 0, 90].map((n) => (n * S) / 100),
    curve: true,
    fill: '#32cd79',
  });
  leafer.add(polygon);
  const say = label(stage, '', true);
  const canvas = leafer.canvas.view as HTMLCanvasElement;
  stage.loop(() => say('canvas cursor: ' + (canvas.style.cursor || '(none)').replace(/url\([^)]*\)/, 'url(…)')));
  drive(stage, 'x = y', [0, 20, 1], 2, (n) => (polygon.cursor = { url: cursorUrl(), x: n, y: n }), 6);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    void ghost.glide(stage.width / 2, mid(stage, S).y + S * 0.85, 600); // inside the mountain
    stage.every(400, () => ghost.move(ghost.at.x + (Math.round(ghost.at.x) % 2 ? 1 : -1), ghost.at.y)); // a move makes the engine re-read the cursor
  }

  return stage.dispose;
};

export default mount;
