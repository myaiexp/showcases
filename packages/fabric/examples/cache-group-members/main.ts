// A cached group paints its members into one cache
import { Canvas, Circle, Group, Rect, Shadow, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { codePanel } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['the group', 'who is caching (ownCaching)'],
    scene: [200, 200],
    hint: 'A group with objectCaching on is one bitmap: its members are painted into it and do not cache themselves. Give a member a shadow offset and the group gives up caching, so each member caches on its own again.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true }), pa);
  const report = codePanel(pb, stage.preview);

  const members: [string, FabricObject][] = [
    ['rect', new Rect({ left: -40, top: -20, width: 56, height: 40, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 2 })],
    ['circle', new Circle({ left: 34, top: -16, radius: 22, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 2 })],
    ['triangle', new Triangle({ left: 0, top: 36, width: 50, height: 36, fill: '#d6f0e0', stroke: '#2e9e5b', strokeWidth: 2 })],
  ];
  const group = new Group(members.map(([, o]) => o), { left: 100, top: 100 });
  canvas.add(group);

  const draw = (): void => {
    canvas.renderAll();
    const lines = [`group  ownCaching: ${group.ownCaching}`];
    for (const [name, o] of members) lines.push(`${name.padEnd(7)}ownCaching: ${o.ownCaching}`);
    lines.push('', `circle.objectCaching: ${members[1]![1].objectCaching} (a member that is on a cache is skipped)`);
    report(lines.join('\n'));
  };
  const o = { cache: true, shadow: false };
  const apply = (): void => {
    group.set('objectCaching', o.cache);
    members[1]![1].set('shadow', o.shadow ? new Shadow({ color: 'rgba(0,0,0,0.4)', blur: 6, offsetX: 6, offsetY: 6 }) : null);
    draw();
  };
  apply();

  if (stage.bar) {
    checkbox(stage.bar, 'group.objectCaching', true, (v) => ((o.cache = v), apply()));
    checkbox(stage.bar, 'shadow on the circle', false, (v) => ((o.shadow = v), apply()));
  } else {
    const states = [{ cache: true, shadow: false }, { cache: true, shadow: true }, { cache: false, shadow: false }];
    let i = 0;
    stage.every(1500, () => {
      Object.assign(o, states[++i % states.length]);
      apply();
    });
  }
  stage.loop((_dt, t) => {
    group.rotate((t * 30) % 360);
    canvas.requestRenderAll();
  });
  return stage.dispose;
};

export default mount;
