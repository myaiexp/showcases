// Interaction: element cursor with CSS cursor names
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a cursor and hover the green shape." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const polygon = new Polygon({
    ...mid(stage, S),
    width: S,
    height: S,
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90].map((n) => (n * S) / 100),
    curve: true,
    fill: '#32cd79',
    cursor: 'no-drop',
  });
  leafer.add(polygon);
  const say = label(stage, '', true);
  const canvas = leafer.canvas.view as HTMLCanvasElement;
  stage.loop(() => say('canvas cursor: ' + (canvas.style.cursor || '(none)')));
  const ghost = stage.preview ? stage.ghost(leafer) : null;
  const names = ['no-drop', 'pointer', 'crosshair', 'grab', 'move', 'zoom-in', 'help', 'text', 'ew-resize'] as const;
  pick(stage, 'cursor', names, (v) => {
    polygon.cursor = v;
    ghost?.move(ghost.at.x + 1, ghost.at.y); // a move makes the engine re-read the cursor
  }, 1200);
  if (ghost) void ghost.glide(mid(stage, S).x + S * 0.2, mid(stage, S).y + S * 0.6, 500); // inside the left arm

  return stage.dispose;
};

export default mount;
