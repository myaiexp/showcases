// Interaction: hitChildren false so children cannot be picked alone
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';
import { tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the green rect: it moves alone, or with the Group when hitChildren is off." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const home = { x: Math.round(stage.width * 0.2), y: Math.round(stage.height / 2 - S * 0.8) };
  const group = new Group({ ...home, draggable: true });
  const rect = new Rect({ width: S, height: S, fill: '#32cd79', draggable: true });
  const ring = new Ellipse({ x: S / 2, y: S / 2, width: S, height: S, innerRadius: 0.5, fill: '#FEB027', draggable: true });
  group.add([rect, ring]);
  leafer.add(group);
  const say = label(stage, '', true);
  const apply = (on: boolean): void => {
    group.hitChildren = on;
    say('group.hitChildren = ' + on);
  };
  apply(true);
  if (stage.bar) checkbox(stage.bar, 'hitChildren', true, apply);
  else {
    const ghost = stage.ghost(leafer);
    tour(stage, [true, false], async (on) => {
      apply(on);
      group.set(home);
      rect.set({ x: 0, y: 0 });
      await stage.wait(300);
      await ghost.drag({ x: home.x + S * 0.25, y: home.y + S * 0.25 }, { x: home.x + S * 0.25 + stage.width * 0.35, y: home.y + S * 0.25 }, 700);
      const what = rect.x! > 5 ? 'only the rect moved' : group.x! - home.x > 5 ? 'the whole Group moved' : 'nothing moved';
      say('group.hitChildren = ' + on + '\n' + what);
      await stage.wait(1100);
    });
  }

  return stage.dispose;
};

export default mount;
