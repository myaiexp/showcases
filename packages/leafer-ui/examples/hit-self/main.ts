// Interaction: hitSelf false on a Box whose child still responds
import { Leafer, Box, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';
import { tryDrag, tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the blue area, then untick hitSelf and drag it again." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.8;
  const home = { x: Math.round(stage.width * 0.15), y: Math.round((stage.height - S) / 2 - 8) };
  const box = new Box({ ...home, width: S, height: S, fill: '#2b8cff', draggable: true });
  const dot = new Ellipse({ x: S * 0.35, y: S * 0.35, width: S * 0.5, height: S * 0.5, fill: '#FFE04B', draggable: true });
  box.add(dot);
  leafer.add(box);
  const say = label(stage, '', true);
  const apply = (on: boolean): void => {
    box.hitSelf = on;
    say('box.hitSelf = ' + on);
  };
  apply(true);
  if (stage.bar) checkbox(stage.bar, 'hitSelf', true, apply);
  else {
    const ghost = stage.ghost(leafer);
    tour(stage, [true, false], async (on) => {
      apply(on);
      const moved = await tryDrag(stage, ghost, box, home, { x: home.x + 12, y: home.y + 12 }, { x: home.x + 12 + stage.width * 0.35, y: home.y + 12 });
      say('box.hitSelf = ' + on + (moved ? '\nthe blue area dragged the Box' : '\nthe blue area ignored the drag'));
      await stage.wait(1000);
    });
  }

  return stage.dispose;
};

export default mount;
